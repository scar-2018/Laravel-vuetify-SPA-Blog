<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = strtolower(request('sortBy'));
        if ($sort == 'latest')
            $posts = Post::latest();
        else if ($sort == 'popular')
            $posts = Post::orderBy('visits', 'DESC');
        else
            $posts = Post::orderBy('title');

        if (request('category')) {
            $posts = $posts->where('category_id', function($query) {
                $query->select('id')->from('categories')->where('slug', request('category'))->limit(1);
            });
        }

        $posts = $posts->paginate(7);

        return PostResource::collection($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::findOrFail(1);

        $data = request()->validate([
            'title' => 'required',
            'category_id' => 'required',
            'content' => 'required'
        ]);

        $post = $user->posts()->create([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'content' => $request->content,
            'slug' => \Illuminate\Support\Str::slug($request->title),
            'cover' => 'cover.jpg'
        ]);

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $data = request()->validate([
            'title' => 'required',
            'category_id' => 'required',
            'content' => 'required'
        ]);

        $post->update([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'content' => $request->content,
            'slug' => \Illuminate\Support\Str::slug($request->title),
            'cover' => 'cover.jpg'
        ]);

        return response()->json('Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json('Successfully deleted');
    }

    public function addVisits(Request $request, Post $post) {
        $post->visits = $post->visits + 1;

        $post->save();

        return new PostResource($post);
    }
}

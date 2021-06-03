<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "slug"  => $this->slug,
            "description" => substr($this->content, 0, 70) . "...",
            "content" => $this->content,
            "ago" => $this->created_at->diffForHumans(),
            "category" => $this->category,
            "online" => !! $this->online,
            "creator" => $this->creator,
            "cover_image" => File::exists('covers/' . $this->cover) ? 'covers/'.$this->cover : 'covers/cover.jpg',
            "visits" => $this->visits
        ];
    }
}

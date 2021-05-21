<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;

class PostSeeder extends Seeder {
    /**
     * Seed the posts table.
     *
     * @return void
     */
    public function run() {
        $faker = Faker::create();

        for ($i=0; $i < 20; $i++) { 
            $category = Category::find(random_int(1, 5));
            $title = $faker->sentence();

            $post = $category->posts()->create([
                'title' => $title,
                'slug' => \Illuminate\Support\Str::slug($title),
                'content' => $faker->paragraph(20),
                'user_id' => User::find(random_int(1, 20))->id,
                'online' => true,
                'cover' => 'cover.jpg',
                'visits' => random_int(0, 50)
            ]);
        }
    }
}

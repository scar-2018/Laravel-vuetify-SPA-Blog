<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the categories table.
     *
     * @return void
     */
    public function run() {
        $categories = [
        	'Web development',
        	'Web & Mobile Design',
        	'Creative Writing',
        	'Technical writing',
        	'Machine Learning'
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create([
                'name' => $category,
                'slug' => \Illuminate\Support\Str::slug($category)
            ]);
        }
    }
}

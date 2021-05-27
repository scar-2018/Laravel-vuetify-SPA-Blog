<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $fillable = ['title', 'category_id', 'content', 'slug', 'cover'];

    public function getRouteKeyName()
    {
        return "slug";
    }
    
    public function category() {
    	return $this->belongsTo(\App\Models\Category::class);
    }

    public function creator() {
    	return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function comments() {
        return $this->hasMany(\App\Models\Comment::class);
    }
}

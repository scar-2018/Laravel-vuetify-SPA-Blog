<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use \App\Http\Controllers\PostController;
use \App\Http\Controllers\CommentController;
use \App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('categories', CategoryController::class);
Route::post('posts/{post}/add-visits', [PostController::class, 'addVisits']);
Route::apiResource('posts', PostController::class);
Route::apiResource('comments', CommentController::class);

Route::group(['prefix' => 'auth'], function() {
	Route::post('login', [AuthController::class, 'login']);
	Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
	Route::get('user', [AuthController::class, 'getAuthUser'])->middleware('auth:api');
});
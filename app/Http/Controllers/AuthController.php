<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(Request $request) {
    	$response = Http::asForm()->post(config('app.url') . 'oauth/token', [
		    'grant_type' => 'password',
		    'client_id' => config('passport.personal_access_client.id'),
		    'client_secret' => config('passport.personal_access_client.secret'),
		    'username' => $request->email,
		    'password' => $request->password,
		    'scope' => '',
		]);

		return $response->json();
    }

    public function logout(Request $request) {
        $request->user('api')->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function getAuthUser(Request $request) {
    	return [
    		'user' => $request->user('api')
    	];
    }
}

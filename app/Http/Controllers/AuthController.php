<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = request()->validate([ 
	        'email' => 'required|email',
	        'password' => 'required',
	    ]);

        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Email and password incorrect.'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('laravel-vuetify-spa-blog');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
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

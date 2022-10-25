<?php

namespace App\Http\Controllers;

use Dotenv\Repository\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:5'
        ]);
        if ($validator->fails()) {
            return response([
                "message" => "Invalid field",
                "error" => $validator->getMessageBag()
            ], 422);
        }
        if (!Auth::attempt($request->all())) {
            return response([
                "message" => "Email or password incorrect"
            ], 401);
        }
        $user = $request->user();
        $token = $user->createToken('token')->plainTextToken;

        $user->update([
            'remember_token' => $token
        ]);
        return response([
            "message" => "Login success",
            "user" => [
                "name" => $user->name,
                "email" => $user->email,
                "access_token" => $token
            ]
        ], 200);
    }

    public function postLogout(Request $request)
    {
        $request->user()->update([
            "remember_token" => null
        ]);
        return response([
            "message" => "Logout success"
        ], 200);
    }
}

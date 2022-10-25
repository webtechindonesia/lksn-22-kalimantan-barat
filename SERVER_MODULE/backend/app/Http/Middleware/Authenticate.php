<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('login');
        }
    }
    public function handle($request, Closure $next, ...$guards)
    {
        try {
            $token = $request->header('Authorization');
            $token = str_replace('Bearer ','', $token);

            if (!$token) {
                return response([
                    "message" => "Unauthenticated"
                ], 401);
            }
            $user = User::where(['remember_token' => $token])->get()->firstOrFail();
            Auth::loginUsingId($user->id);
            return $next($request);
        } catch (Exception $e) {
            return response([
                "message" => "Unauthenticated"
            ], 401);
        }
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\Form;
use Closure;
use Exception;
use Illuminate\Http\Request;

class FormSlugMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $slug = $request->slug;
            $forms = Form::where('slug', $slug)->get()->firstOrFail();
            return $next($request);
        } catch (Exception $e) {
            return response([
                'message' => 'Form not found'
            ], 404);
        }
    }
}

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('/v1')->group(function () {
    Route::group([
        "prefix" => "/auth",
        "controller" => AuthController::class
    ], function () {
        Route::get('/user', 'getUser');
        Route::post('/login', 'postLogin');
        Route::post('/logout', 'postLogout')->middleware('auth:api');
    });

    Route::group([
        "prefix" => "/forms",
        "controller" => FormController::class,
        "middleware" => 'auth:api'
    ], function () {
        Route::post('/', 'postForm');
        Route::get('/', 'getAllForm');
        Route::get('/{slug}', 'getDetailForm');
        Route::group([
            'prefix' => '/{slug}/questions',
        ], function () {
            Route::post('/', 'postQuestion');
            Route::delete('/{id}', 'deleteQuestion');
        });
        Route::group([
            "prefix" => '/{slug}/responses',
        ], function () {
            Route::post('/','postResponse');
            Route::get('/', 'getAllResponse');
        });
    });
});

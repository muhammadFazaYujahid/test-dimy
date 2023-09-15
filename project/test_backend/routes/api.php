<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customers',[CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::post('/order', [OrderController::class, 'store']);
Route::post('/transaction', [TransactionController::class, 'store']);
Route::get('/transaction/{id}',[TransactionController::class, 'show']);

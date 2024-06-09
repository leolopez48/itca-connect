<?php

use App\Http\Controllers\CampusController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\DetailCampusPlaceController;
use App\Http\Controllers\DruidController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrequentQuestionController;
use App\Http\Controllers\PlaceTypeController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\TypeEventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/status', function () {
    return response()->json([
        'message' => "OK"
    ]);
});

Route::resource('/campus', CampusController::class);
Route::resource('/school', SchoolController::class);
Route::resource('/career', CareerController::class);
Route::resource('/typeEvent', TypeEventController::class);

Route::get('/eventBydates', [EventController::class, 'eventsByDates']);
Route::resource('/event', EventController::class);
// Route::get('/event', [EventController::class, 'index']);

Route::resource('/placeType', PlaceTypeController::class);
Route::resource('/detailCampusPlace', DetailCampusPlaceController::class);
// Route::resource('/role', RoleController::class);
Route::resource('/frequentQuestion', FrequentQuestionController::class);
Route::resource('/user', UserController::class);
Route::post('/druid', [DruidController::class, 'druid']);

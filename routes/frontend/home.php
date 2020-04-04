<?php

use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\GameController;
use App\Http\Controllers\Frontend\RoomsController;
// use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Frontend\User\AccountController;

Route::get('admin/login', [DashboardController::class, 'login']);

Route::group(['middleware' => ['auth', 'password_expires']], function () {
    // back up
    // Route::get('contact', [ContactController::class, 'index'])->name('contact');
    // Route::post('contact/send', [ContactController::class, 'send'])->name('contact.send');


    Route::group(['prefix' => 'room'], function () {
        Route::post('join', [RoomsController::class, 'join']);
        Route::post('store', [RoomsController::class, 'store']);
        Route::get('data', [RoomsController::class, 'roomData']);
        // Route::get('{room}', [RoomsController::class, 'show'])->name('rooms.show');
        Route::post('seats', [RoomsController::class, 'upadteRoomSeats']);
        Route::post('toGameView', [RoomsController::class, 'toGameView']);
    });
    Route::group(['prefix' => 'game'], function () {
        Route::post('ready', [RoomsController::class, 'readyGame']);
        Route::post('start', [GameController::class, 'startGame']);
        Route::group(['prefix' => 'skill'], function () {
            Route::post('werewolf', [GameController::class, 'useSkillWerewolf']);
            Route::post('prophet', [GameController::class, 'useSkillProphet']);
            Route::post('prophet_end', [GameController::class, 'useSkillProphetEnd']);
            Route::post('knight', [GameController::class, 'useSkillKnight']);
            Route::post('knight_end', [GameController::class, 'useSkillKnightEnd']);
        });
    });

    Route::get('auth', [AccountController::class, 'getAuth']);
    Route::get('/{any}', function () {
        return view('frontend.app');
    })->where('any', '.*')->name('app');
});

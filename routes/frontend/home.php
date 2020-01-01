<?php

use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\GameController;
use App\Http\Controllers\Frontend\RoomsController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Frontend\MessagesController;
use App\Http\Controllers\Frontend\User\AccountController;
use App\Http\Controllers\Frontend\User\ProfileController;

Route::get('admin/login', [DashboardController::class, 'login'])->name('admin.login');

Route::group(['middleware' => ['auth', 'password_expires']], function () {
    // Route::get('contact', [ContactController::class, 'index'])->name('contact');
    // Route::post('contact/send', [ContactController::class, 'send'])->name('contact.send');

    Route::group(['namespace' => 'User', 'as' => 'user.'], function () {
        // User Account Specific
        Route::get('account', [AccountController::class, 'index'])->name('account');

        // User Profile Specific
        Route::patch('profile/update', [ProfileController::class, 'update'])->name('profile.update');
    });
    Route::group(['prefix' => 'room'], function () {
        Route::post('join', [RoomsController::class, 'join']);
        Route::post('store', [RoomsController::class, 'store'])->name('rooms.store');
        Route::get('data', [RoomsController::class, 'roomData'])->name('rooms.roomData');
        // Route::get('{room}', [RoomsController::class, 'show'])->name('rooms.show');
        Route::post('seats', [RoomsController::class, 'upadteRoomSeats'])->name('rooms.seats');
        Route::post('toGameView', [RoomsController::class, 'toGameView']);
    });
    Route::group(['prefix' => 'game'], function () {
        Route::post('start', [GameController::class, 'startGame']);
        Route::group(['prefix' => 'skill'], function () {
            Route::post('werewolf', [GameController::class, 'useSkillWerewolf']);
        });
    });

    Route::post('messages/store', [MessagesController::class, 'store'])->name('messages.store');
    Route::get('auth', [AccountController::class, 'getAuth'])->name('auth.get');

    Route::get('/', [HomeController::class, 'index'])->name('index');
    Route::get('{any}', function () {
        return view('frontend.app');
    })->where('any', '.*');
});

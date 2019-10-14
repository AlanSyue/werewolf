<?php

use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\User\AccountController;
use App\Http\Controllers\Frontend\User\ProfileController;
use App\Http\Controllers\Frontend\User\DashboardController;
use App\Http\Controllers\Frontend\RoomsController;
use App\Http\Controllers\Frontend\MessagesController;
/*
 * Frontend Controllers
 * All route names are prefixed with 'frontend.'.
 */

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('contact', [ContactController::class, 'index'])->name('contact');
Route::post('contact/send', [ContactController::class, 'send'])->name('contact.send');

/*
 * These frontend controllers require the user to be logged in
 * All route names are prefixed with 'frontend.'
 * These routes can not be hit if the password is expired
 */
Route::group(['middleware' => ['auth', 'password_expires']], function () {
    Route::group(['namespace' => 'User', 'as' => 'user.'], function () {
        // User Account Specific
        Route::get('account', [AccountController::class, 'index'])->name('account');

        // User Profile Specific
        Route::patch('profile/update', [ProfileController::class, 'update'])->name('profile.update');
    });
    Route::group(['prefix' => 'rooms'], function () {
        // Route::get('', [RoomsController::class, 'index'])->name('rooms.index');
        Route::get('create', [RoomsController::class, 'create'])->name('rooms.create');
        Route::get('join', [RoomsController::class, 'joinPage'])->name('rooms.join');
        Route::post('join', [RoomsController::class, 'join']);
        Route::post('store', [RoomsController::class, 'store'])->name('rooms.store');
        Route::get('data', [RoomsController::class, 'roomData'])->name('rooms.roomData');
        Route::get('{room}', [RoomsController::class, 'show'])->name('rooms.show');
        // Route::post('{room}/join', [RoomsController::class, 'join'])->name('rooms.join');
    });

    Route::post('messages/store', [MessagesController::class, 'store'])->name('messages.store');
    Route::get('auth', [AccountController::class, 'getAuth'])->name('auth.get');
});

<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('all', function ($user) {
    return true;
});

Broadcast::channel('room.{roomId}', function ($user, $roomId) {
    if ($user->hasJoined($roomId)) {
        return [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'first_name' => $user->first_name,
        ];
    }

    return true;
});

Broadcast::channel('message', function ($user) {
    return Auth::check();
});

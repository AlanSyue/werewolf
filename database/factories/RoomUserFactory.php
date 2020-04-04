<?php

use Faker\Generator;
use App\Models\Room\RoomUser;

$factory->define(RoomUser::class, function (Generator $faker) {
    return [
        'user_id' => 0,
        'room_id' => 0
    ];
});


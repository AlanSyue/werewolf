<?php

use Faker\Generator;
use App\Models\Room\Room;

$factory->define(Room::class, function (Generator $faker) {
    return [
        'user_id' => 0
    ];
});
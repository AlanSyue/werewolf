<?php

use Faker\Generator;
use App\Models\Game\Game;
use Illuminate\Support\Str;

$factory->define(Game::class, function (Generator $faker) {
    return [
        'room_id' => Str::random(10),
        'stage' => 'morning',
        'civilian_amount' => 0,
        'prophet_amount' => 0,
        'witch_amount' => 0,
        'knight_amount' => 0,
        'hunter_amount' => 0,
        'werewolf_amount' => 0,
        'snowwolf_amount' => 0,
        'kingwolf_amount' => 0,
    ];
});

$factory->state(Game::class, 'standard', function () {
    return [
        'civilian_amount' => 4,
        'prophet_amount' => 1,
        'witch_amount' => 1,
        'knight_amount' => 1,
        'hunter_amount' => 1,
        'werewolf_amount' => 3,
        'snowwolf_amount' => 0,
        'kingwolf_amount' => 1,
    ];
});

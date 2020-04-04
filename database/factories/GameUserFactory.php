<?php

use Faker\Generator;
use App\Models\Game\GameUser;

$factory->define(GameUser::class, function (Generator $faker) {
    return [
        'user_id' => 0,
        'game_id' => 0,
        'seat_index' => 1,
        'role_type' => '',
        'skill_use_status' => false,
        'is_live' => true,
        'is_skill_allowed' => false
    ];
});
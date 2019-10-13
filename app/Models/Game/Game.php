<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game\Traits\Relationship\GameRelationship;
use App\Models\Game\Traits\Method\GameMethod;

class Game extends Model
{
    use GameRelationship,
        GameMethod;


    protected $fillable = [
        'room_id',
        'civilian_amount',
        'prophet_amount',
        'witch_amount',
        'knight_amount',
        'hunter_amount',
        'werewolf_amount',
        'snowwolf_amount',
        'kingwolf_amount'
    ];
}

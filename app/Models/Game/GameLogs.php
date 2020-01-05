<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game\Traits\Method\GameLogsMethod;
use App\Models\Game\Traits\Relationship\GameLogsRelationship;

class GameLogs extends Model
{
    use GameLogsRelationship,
        GameLogsMethod;

    protected $fillable = [
        'game_id',
        'user_id',
        'target_user_id',
        'skill',
        'stage',
        'day'
    ];
}

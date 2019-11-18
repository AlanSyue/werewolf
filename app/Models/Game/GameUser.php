<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game\Traits\Method\GameUserMethod;
use App\Models\Game\Traits\Relationship\GameUserRelationship;

class GameUser extends Model
{
    use GameUserRelationship,
        GameUserMethod;

    protected $guard = [
        'id',
    ];
}

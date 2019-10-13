<?php

namespace App\Models\Game;

use Illuminate\Database\Eloquent\Model;
use App\Models\Game\Traits\Relationship\GameUserRelationship;
use App\Models\Game\Traits\Method\GameUserMethod;

class GameUser extends Model
{
    use GameUserRelationship,
        GameUserMethod;

    protected $guard = [
        'id'
    ];
}

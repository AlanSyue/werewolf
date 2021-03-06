<?php

namespace App\Models\Game\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Room;
use App\Models\Game\GameUser;
use App\Models\Game\GameLogs;

/**
 * Class UserRelationship.
 */
trait GameRelationship
{
    /**
     * The rooms that belongs to the user.
     */
    public function room()
    {
        return $this->belongsToOne(Room::class, 'room_id');
    }

    /**
     * Define room relationship.
     *
     * @return mixed
     */
    public function gameUsers()
    {
        return $this->hasMany(GameUser::class, 'game_id');
    }

    /**
     * Define room relationship.
     *
     * @return mixed
     */
    public function gameLogs()
    {
        return $this->hasMany(GameLogs::class, 'game_id');
    }
}

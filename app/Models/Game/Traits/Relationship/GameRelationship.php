<?php

namespace App\Models\Game\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Room;
use App\Models\Game\GameUser;

/**
 * Class UserRelationship.
 */
trait GameRelationship
{
    /**
     * The rooms that belongs to the user
     */
    public function room()
    {
        return $this->belongsToOne(Room::class, 'room_id');
    }

    /**
     * Define room relationship
     * 
     * @return mixed
     */
    public function users()
    {
        return $this->hasMany(GameUser::class, 'game_id');
    }
}

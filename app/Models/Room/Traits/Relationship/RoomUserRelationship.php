<?php

namespace App\Models\Room\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Room;

/**
 * Class RoomUserRelationship.
 */
trait RoomUserRelationship
{
    /**
     * The roomUser that belongs to the user.
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * Define roomUser relationship.
     *
     * @return mixed
     */
    public function room()
    {
        return $this->belongsToOne(Room::class, 'room_id');
    }
}

<?php

namespace App\Models\Room\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Room;

/**
 * Class UserRelationship.
 */
trait MessageRelationship
{
    /**
     * Define user relationship.
     *
     * @return mixed
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Define room relationship.
     *
     * @return mixed
     */
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}

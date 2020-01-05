<?php

namespace App\Models\Game\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Room;

/**
 * Class UserRelationship.
 */
trait GameLogsRelationship
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
    public function user()
    {
        return $this->belongsToOne(User::class, 'user_id');
    }
}

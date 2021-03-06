<?php

namespace App\Models\Room\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Game\Game;
use App\Models\Room\Message;
use App\Models\Room\RoomUser;

/**
 * Class UserRelationship.
 */
trait RoomRelationship
{
    /**
     * The rooms that belongs to the user.
     */
    public function roomUsers()
    {
        return $this->hasMany(RoomUser::class, 'room_id');
    }

    /**
     * Define room relationship.
     *
     * @return mixed
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'room_id');
    }

    /**
     * Define room relationship.
     *
     * @return mixed
     */
    public function games()
    {
        return $this->hasMany(Game::class, 'room_id');
    }
}

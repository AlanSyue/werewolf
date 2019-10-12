<?php

namespace App\Models\Room\Traits\Relationship;

use App\Models\Auth\User;
use App\Models\Room\Message;

/**
 * Class UserRelationship.
 */
trait RoomRelationship
{
    /**
     * The rooms that belongs to the user
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'room_user')
            ->withTimestamps();
    }

    /**
     * Define room relationship
     * 
     * @return mixed
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'room_id');
    }
}

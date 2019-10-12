<?php

namespace App\Models\Room\Traits\Method;

use App\Models\Auth\User;

/**
 * Trait RoleMethod.
 */
trait RoomMethod
{
    /**
     * Join a chat room
     * 
     * @param \App\Models\Auth\User $user
     */
    public function join(User $user)
    {
        return $this->users()->attach($user);
    }

    /**
     * Leave a chat room
     * 
     * @param \App\Models\Auth\User $user
     */
    public function leave(User $user)
    {
        return $this->users()->detach($user);
    }
}

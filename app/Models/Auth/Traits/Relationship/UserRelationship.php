<?php

namespace App\Models\Auth\Traits\Relationship;

use App\Models\Auth\SocialAccount;
use App\Models\Auth\PasswordHistory;
use App\Models\Room\Room;
use App\Models\Room\Message;

/**
 * Class UserRelationship.
 */
trait UserRelationship
{
    /**
     * @return mixed
     */
    public function providers()
    {
        return $this->hasMany(SocialAccount::class);
    }

    /**
     * @return mixed
     */
    public function passwordHistories()
    {
        return $this->hasMany(PasswordHistory::class);
    }

    /**
     * The rooms that this user belongs to
     */
    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_user')
            ->withTimestamps();
    }

    /**
     * Define messages relation
     * 
     * @return mixed
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }
}

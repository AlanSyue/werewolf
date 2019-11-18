<?php

namespace App\Models\Auth\Traits\Relationship;

use App\Models\Room\Message;
use App\Models\Room\RoomUser;
use App\Models\Auth\SocialAccount;
use App\Models\Auth\PasswordHistory;

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
     * The rooms that this user belongs to.
     */
    public function room()
    {
        return $this->hasOne(RoomUser::class, 'user_id');
    }

    /**
     * Define messages relation.
     *
     * @return mixed
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }
}

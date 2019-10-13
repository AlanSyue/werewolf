<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room\Traits\Relationship\RoomUserRelationship;

class RoomUser extends Model
{
    use RoomUserRelationship;

    protected $table = 'room_user';
    /**
     * The attributes that are mass assigned.
     *
     * @return array
     */
    protected $fillable = [
        'user_id',
        'room_id'
    ];
}

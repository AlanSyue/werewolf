<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room\Traits\Relationship\RoomRelationship;
use App\Models\Room\Traits\Method\RoomMethod;



class Room extends Model
{
    use RoomRelationship,
        RoomMethod;

    /**
     * The attributes that are mass assigned.
     *
     * @return array
     */
    protected $fillable = [
        'user_id'
    ];
}

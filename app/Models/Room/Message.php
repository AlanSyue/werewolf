<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room\Traits\Relationship\MessageRelationship;

class Message extends Model
{
    use MessageRelationship;

    protected $fillable = [
        'body', 'user_id', 'room_id'
    ];
}

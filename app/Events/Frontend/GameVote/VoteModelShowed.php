<?php

namespace App\Events\Frontend\GameVote;

use App\Models\Room\Room;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class VoteModelShowed implements ShouldBroadcast
{
    use SerializesModels;

    private $room;
    public function __construct(Room $room)
    {
        $this->room = $room;
    }
    
    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->room->id);
    }
}

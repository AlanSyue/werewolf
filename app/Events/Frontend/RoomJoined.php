<?php

namespace App\Events\Frontend;

use App\Models\Auth\User;
use App\Models\Room\Room;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RoomJoined implements ShouldBroadcast
{
    use SerializesModels;

    /**
     * The user that joined the room.
     */
    public $user;

    /**
     * The room the user joined.
     */
    public $room;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user, Room $room)
    {
        $this->user = $user;
        $this->room = $room;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->room->id);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'room.joined';
    }
}

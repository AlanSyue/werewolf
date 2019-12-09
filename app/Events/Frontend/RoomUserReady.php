<?php

namespace App\Events\Frontend;

use App\Models\Game\Game;
use Illuminate\Support\Facades\Redis;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RoomUserReady implements ShouldBroadcast
{
    use Dispatchable, SerializesModels, InteractsWithSockets;

    /**
     * The message to be broadcasted.
     */
    public $game;
    public $user;
    public $roomUser;

    /**
     * Create a new event instance.
     */
    public function __construct(Game $game, $roomUser, $user)
    {
        $this->game = $game;
        $this->user = $user;
        $this->roomUser = $roomUser;

        Redis::rpush($roomUser->room_id.'.'.$game->id, $user->id);
    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->game->room_id);
    }

    public function broadcastWith()
    {
        return  [
            'readyUser' => Redis::lrange($roomUser->room_id.'.'.$game->id, 0, -1)
        ];
    }
}

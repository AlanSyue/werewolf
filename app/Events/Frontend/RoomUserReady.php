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
    private $gameUsers;
    private $game;
    private $user;
    public $roomUser;
    public $readyUsers;

    /**
     * Create a new event instance.
     */
    public function __construct(array $gameUsers, Game $game, $roomUser, $user)
    {
        $this->gameUsers = $gameUsers;
        $this->game = $game;
        $this->user = $user;
        $this->roomUser = $roomUser;
        $this->changeReadyStatus();
        $this->readyUsers = Redis::hgetall($roomUser->room_id.'.'.$game->id);

    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->game->room_id);
    }

    public function changeReadyStatus()
    {
        $readyUserStatus = Redis::hgetall($this->roomUser->room_id.'.'.$this->game->id);
        $originStatus = $readyUserStatus[$this->user->id];
        $readyUserStatus[$this->user->id] = $originStatus ? 0 : 1;
        Redis::hMset($this->roomUser->room_id.'.'.$this->game->id, $readyUserStatus); 
    }

}

<?php

namespace App\Events\Frontend;

use App\Models\Game\Game;
use Illuminate\Support\Facades\Redis;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GameUserUpdated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels, InteractsWithSockets;

    /**
     * The message to be broadcasted.
     */
    public $gameUsers;

    protected $game;

    public $roomUser;

    public $readyUsers;

    /**
     * Create a new event instance.
     */
    public function __construct(array $gameUsers, Game $game, $roomUser)
    {
        $this->gameUsers = $gameUsers;
        $this->game = $game;
        $this->roomUser = $roomUser;
        $this->setReadyUser($this->gameUsers, $this->roomUser, $this->game);
        $this->readyUsers = Redis::hgetall($this->roomUser->room_id.'.'.$this->game->id);
    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->game->room_id);
    }

    public function setReadyUser($gameUsers, $roomUser, $game)
    {
        $readyStatus = [];
        foreach ($gameUsers as $key => $value) {
            // exclude the room creator
            if ( $roomUser->user_id == $value['user_id'] ) {
                continue;
            }
            $readyStatus[$value['user_id']] = 0;
        }
        Redis::hMset($roomUser->room_id.'.'.$game->id, $readyStatus);
    }
}

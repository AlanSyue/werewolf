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

    /**
     * Create a new event instance.
     */
    public function __construct(array $gameUsers, Game $game, $roomUser)
    {
        $this->gameUsers = $gameUsers;
        $this->game = $game;
        $this->roomUser = $roomUser;
        $this->setReadyUser($this->gameUsers, $this->roomUser, $this->game);
    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->game->room_id);
    }

    public function broadcastWith()
    {
        return  [
            'readyUser' => Redis::hgetall($roomUser->room_id.'.'.$game->id)
        ];
    }

    public function setReadyUser($gameUsers, $roomUser, $game)
    {
        foreach ($gameUsers as $key => $value) {
            Redis::hset($roomUser->room_id.'.'.$game->id, $value['user_id'] , 0 );
        }
    }
}

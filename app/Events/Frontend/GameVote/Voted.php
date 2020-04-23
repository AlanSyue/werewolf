<?php

namespace App\Events\Frontend\GameVote;

use App\Models\Room\Room;
use App\Models\Game\Game;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Voted implements ShouldBroadcast
{
    use SerializesModels;

    private $game;
    public $gameLogs;

    public function __construct(Game $game, $gameLogs)
    {
        $this->game = $game;
        $this->gameLogs = $gameLogs;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->game->room_id);
    }
}

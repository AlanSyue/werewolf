<?php

namespace App\Events\Frontend;

use App\Models\Auth\User;
use App\Models\Room\Room;
use App\Models\Game\Game;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class StageChanged implements ShouldBroadcast
{
    use SerializesModels;

    public $room;
    public $game;
    public $gameUsers;
    public $soundData;
    public function __construct(Room $room, Game $game, $gameUsers, $soundData)
    {
        $this->room = $room;
        $this->game = $game;
        $this->gameUsers = $gameUsers;
        $this->soundData = $soundData;
    }
    
    public function broadcastOn()
    {
        return new PresenceChannel('room.'.$this->room->id);
    }
}

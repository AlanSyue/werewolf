<?php

namespace App\Services\Frontend;

use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;
use App\Models\Game\Game;
use Config;

/**
 * Class GameRepository.
 */
class RoomService
{
    /**
     * RoomService constructor.
     *
     * @param  RoomRepository  $roomRepository
     */
    public function __construct(RoomRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function  generateGameUserInsert(Game $game, array $gameUsers)
    {
        $roleTypeTable = Config::get('constants.role_type');
        $roleTypes = [];
        for ($i = 0; $i < $game->civilian_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['civilian']);
        }
        for ($i = 0; $i < $game->werewolf_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['werewolf']);
        }
        for ($i = 0; $i < $game->snowwolf_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['snowwolf']);
        }
        for ($i = 0; $i < $game->kingwolf_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['kingwolf']);
        }
        for ($i = 0; $i < $game->prophet_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['prophet']);
        }
        for ($i = 0; $i < $game->witch_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['witch']);
        }
        for ($i = 0; $i < $game->knight_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['knight']);
        }
        for ($i = 0; $i < $game->hunter_amount; $i++) {
            array_push($roleTypes, $roleTypeTable['hunter']);
        }

        return collect($gameUsers)->shuffle()
            ->map(function ($gameUser, $key) use ($game, $roleTypes) {
                $roleType = $roleTypes[$key];
                return [
                    'game_id' => $game->id,
                    'seat_index' => $gameUser['seat_index'],
                    'user_id' => $gameUser['user_id'],
                    'role_type' => $roleType,
                ];
            })->toArray();
    }    
}

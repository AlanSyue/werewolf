<?php

namespace App\Http\Resources\Frontend;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $game = $this->games->first();
        $gameData = $game->toArray();
        $gameUserAmount = [
            'civilianAmount' => $game->civilian_amount,
            'werewolfAmount' => $game->werewolf_amount,
            'snowwolfAmount' => $game->snowwolf_amount,
            'kingwolfAmount' => $game->kingwolf_amount,
            'prophetAmount' => $game->prophet_amount,
            'witchAmount' => $game->witch_amount,
            'knightAmount' => $game->knight_amount,
            'hunterAmount' => $game->hunter_amount,
        ];
        $totalGameUser = array_sum($gameUserAmount);

        $gameLogs = $gameData['game_logs'];
        unset($gameData['game_logs']);
        
        $gameUsers = $gameData['game_users'];
        if (count($gameUsers) == $totalGameUser) {
            unset($gameData['game_users']);
        } else {
            $gameUsers = collect(range(1, $totalGameUser))->map(function ($seatIndex) {
                return [
                    'id' => 0,
                    'seat_index' => $seatIndex,
                    'user_id' => null,
                ];
            });
        }

        return [
            'room' => [
                'id' => $this->id,
                'mayor_user_id' => $this->user_id,
                'pin_code' => base64_encode($this->id),
            ],
            'game' => $gameData,
            'users' => $this->roomUsers->map(function ($roomUser) {
                return $roomUser->user;
            }),
            'gameUsers' => $gameUsers,
            'gameLogs' => $gameLogs,
        ];
    }
}

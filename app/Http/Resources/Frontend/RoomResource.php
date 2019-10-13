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
        $seats = collect(range(1, $totalGameUser))->map(function ($seatId) {
            return [
                'id' => $seatId,
                'user_id' => 0
            ];
        });

        return [
            'room' => [
                'id' => $this->id,
                'pin_code' => base64_encode($this->id),
            ],
            'game' => $this->games->first(),
            'users' => $this->roomUsers->map(function ($roomUser) {
                return $roomUser->user;
            }),
            'seats' => $seats
        ];
    }
}

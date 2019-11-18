<?php

namespace App\Http\Resources\Frontend;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomRelation extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'room' => [
                'id' => $this->id,
                'pin_code' => base64_encode($this->id),
            ],
            'game' => $this->games->first(),
            'users' => $this->roomUsers->map(function ($roomUser) {
                return $roomUser->user;
            }),
        ];
    }
}

<?php

namespace App\Services\Frontend;

use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;

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
}

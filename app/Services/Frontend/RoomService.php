<?php

namespace App\Services\Frontend;


use Exception;
use App\Events\Frontend\RoomJoined;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Request;
use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;
use App\Http\Resources\Frontend\RoomResource;

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

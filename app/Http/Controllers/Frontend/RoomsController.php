<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Room\Room;
use App\Events\Frontend\RoomJoined;
use Illuminate\Support\Facades\Log;
use App\Events\Frontend\GameStarted;
use App\Events\Frontend\RoomUserReady;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Frontend\RoomService;
use App\Events\Frontend\GameUserUpdated;
use App\Http\Resources\Frontend\RoomResource;
use Symfony\Component\HttpFoundation\Request;
use App\Repositories\Frontend\Room\RoomRepository;

class RoomsController extends Controller
{
    /**
     * RoomsController constructor.
     *
     * @param  RoomService  $roomService
     * @param  RoomRepository  $roomRepository
     */
    public function __construct(RoomService $roomService, RoomRepository $roomRepository)
    {
        $this->roomService = $roomService;
        $this->roomRepository = $roomRepository;
    }

    /**
     * Store a newly created room in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'civilian_amount' => 'required',
            'prophet_amount' => 'required',
            'witch_amount' => 'required',
            'knight_amount' => 'required',
            'hunter_amount' => 'required',
            'werewolf_amount' => 'required',
            // 'snowwolf_amount' => 'required',
            'kingwolf_amount' => 'required',
        ]);

        try {
            $user = Auth::user();
            $roomInsertData = [
                'user_id' => $user->id,
            ];
            $gameInsertData = [
                'civilian_amount' => $request->input('civilian_amount', 0),
                'prophet_amount' => $request->input('prophet_amount', 0),
                'witch_amount' => $request->input('witch_amount', 0),
                'knight_amount' => $request->input('knight_amount', 0),
                'hunter_amount' => $request->input('hunter_amount', 0),
                'werewolf_amount' => $request->input('werewolf_amount', 0),
                'snowwolf_amount' => $request->input('snowwolf_amount', 0),
                'kingwolf_amount' => $request->input('kingwolf_amount', 0),
            ];
            $room = $this->roomRepository->createGameRoom($roomInsertData, $gameInsertData);
            $this->roomRepository->updateRoomUser($user, $room);
        } catch (Exception $e) {
            Log::error('Exception while creating a chatroom', [
                'file' => $e->getFile(),
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return back()->withInput();
        }

        $encodeRoomId = base64_encode($room->id);

        return response()->json([
            'id' => $room->id,
            'encodeRoomId' => $encodeRoomId,
        ]);
    }

    /**
     * Allow user to join chat room.
     *
     * @param Room $room
     * @param \Illuminate\Http\Request $request
     */
    public function join(Room $model, Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'pin_code' => 'required',
        ]);
        $encodeRoomId = $request->input('pin_code', '');
        $roomId = base64_decode($encodeRoomId);

        $room = $model->find($roomId);

        if (! $room) {
            return  response('尚未加入房間', 400);
        }

        try {
        } catch (Exception $e) {
            Log::error('Exception while joining a chat room', [
                'file' => $e->getFile(),
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return back();
        }

        $this->roomRepository->updateRoomUser($user, $room);
        event(new RoomJoined($request->user(), $room));

        return $room;
    }

    public function roomData(Request $request)
    {
        $user = Auth::user();

        if (! $user) {
            abort(403);
        }
        $roomUser = $this->roomRepository->getRoomUserForUser($user);

        if (! isset($roomUser)) {
            return  response('尚未加入房間', ＠);
        }
        $roomRelationData = $this->roomRepository->getRoomAllRelationData($roomUser->room_id);

        return new RoomResource($roomRelationData);
    }

    public function upadteRoomSeats(Request $request)
    {
        $this->validate($request, [
            'seats' => 'required',
        ]);
        $seats = $request->input('seats');
        $user = Auth::user();
        $roomUser = $this->roomRepository->getRoomUserForUser($user);
        $game = $this->roomRepository->getGameByRoomId($roomUser->room_id);
        $isSuccess = $this->roomRepository->createOrUpdateGameUser($game, $seats);

        if ($isSuccess) {
            $gameUsers = $this->roomRepository->getGameUsers($game->id);
        }
        event(new GameUserUpdated($gameUsers->toArray(), $game, $roomUser));

        return $gameUsers;
    }

    public function readyGame()
    {
        $user = Auth::user();
        $roomUser = $this->roomRepository->getRoomUserForUser($user);
        $game = $this->roomRepository->getGameByRoomId($roomUser->room_id);

        event(new RoomUserReady($game, $roomUser, $user));
    }

    public function startGame()
    {
        $user = Auth::user();
        $roomUser = $this->roomRepository->getRoomUserForUser($user);
        $game = $this->roomRepository->getGameByRoomId($roomUser->room_id);
        event(new GameStarted($game));
    }
}

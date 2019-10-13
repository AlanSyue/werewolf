<?php

namespace App\Repositories\Frontend\Room;

use Exception;
use App\Models\Auth\User;
use App\Models\Game\Game;
use App\Models\Room\Room;
use App\Models\Room\RoomUser;
use Illuminate\Support\Facades\DB;
use App\Repositories\BaseRepository;

/**
 * Class GameRepository.
 */
class RoomRepository extends BaseRepository
{
    /**
     * GameRepository constructor.
     *
     * @param  Room  $model
     */
    public function __construct(
        Room $model,
        RoomUser $roomUserModel,
        Game $gameModel
    ) {
        $this->model = $model;
        $this->roomUserModel = $roomUserModel;
        $this->gameModel = $gameModel;
    }

    public function createGameRoom($roomInsertData, $gameInsertData)
    {
        DB::beginTransaction();
        try {
            $room = $this->model->create($roomInsertData);
            $game = new $this->gameModel;
            $game->fill($gameInsertData);
            $room->games()->save($game);
        } catch (Exception $e) {
            throw $e;
        }
        DB::commit();
        return $room;
    }

    public function getRoomUserForUser(User $user)
    {
        return $this->roomUserModel
            ->where('user_id', $user->id)
            ->first();
    }


    public function getRoomAllRelationData($roomId)
    {
        return $this->model
            ->where('id', $roomId)
            ->with([
                'games' => function ($query) {
                    $query->where('status', true)->first();
                },
                'roomUsers.user' => function ($query) {
                    $query->select('id', 'first_name');
                }
            ])
            ->first();
    }

    public function updateRoomUser(User $user, Room $room)
    {
        $roomUser = $this->roomUserModel
            ->updateOrCreate([
                'user_id' => $user->id
            ], [
                'room_id' => $room->id
            ]);
        return $roomUser ? true : false;
    }
}

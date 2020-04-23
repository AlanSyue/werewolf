<?php

namespace App\Repositories\Frontend\Room;

use Exception;
use App\Models\Auth\User;
use App\Models\Game\Game;
use App\Models\Room\Room;
use App\Models\Game\GameUser;
use App\Models\Room\RoomUser;
use Illuminate\Support\Facades\DB;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Redis;

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
        Game $gameModel,
        GameUser $gameUserModel
    ) {
        $this->model = $model;
        $this->roomUserModel = $roomUserModel;
        $this->gameModel = $gameModel;
        $this->gameUserModel = $gameUserModel;
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

    public function getRoomByUserId($roomId)
    {
        return $this->model->getByUserId($roomId);
    }

    public function getGameByRoomId($roomId)
    {
        return $this->gameModel->where('room_id', $roomId)->first();
    }

    public function getRoomUsers($roomId)
    {
        return $this->roomUserModel
            ->where('room_id', $roomId)
            ->get();
    }

    public function getRoomUserForUser(User $user)
    {
        return $this->roomUserModel
            ->where('user_id', $user->id)
            ->first();
    }

    public function isRoomManager($roomId, $userId)
    {
        return $this->model
            ->where([
                'id' => $roomId,
                'user_id' => $userId
            ])->exists();
    }

    public function updateRoomUser(User $user, Room $room)
    {
        $roomUser = $this->roomUserModel
            ->updateOrCreate([
                'user_id' => $user->id,
            ], [
                'room_id' => $room->id,
            ]);

        return $roomUser ? true : false;
    }

    public function getRoomAllRelationData($roomId)
    {
        return $this->model
            ->where('id', $roomId)
            ->with([
                'games' => function ($query) {
                    $query->where('status', true)->first();
                },
                'games.gameUsers',
                'games.gameLogs',
                'roomUsers.user' => function ($query) {
                    $query->select('id', 'first_name');
                },
            ])
            ->first();
    }

    public function deleteAndInsertGameUser(Game $game, array $insertData)
    {
        $this->gameUserModel->where('game_id', $game->id)->delete();
        return $this->gameUserModel->insert($insertData);
    }

    public function getGameUsers($gameId)
    {
        return $this->gameUserModel->where('game_id', $gameId)->get();
    }

    /**
     * @param $roomId int room_id
     * @param $gameId int game_id
     * @return array
     */
    public function getReadyUsersArray($roomId, $gameId)
    {
        return Redis::hgetall($roomId . '.' . $gameId);
    }
}

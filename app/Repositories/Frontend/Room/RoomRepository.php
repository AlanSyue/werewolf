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
        return $this->roomModel->find($roomId);
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
                'roomUsers.user' => function ($query) {
                    $query->select('id', 'first_name');
                },
            ])
            ->first();
    }

    public function createOrUpdateGameUser(Game $game, array $seats)
    {
        $this->gameUserModel->where('game_id', $game->id)->delete();
        $insertData = $this->getGameUserInsertDataWithRandomRoleType($game, $seats);
        $bool = $this->gameUserModel
            ->insert($insertData);

        return $bool;
    }

    public function getGameUsers($gameId)
    {
        return $this->gameUserModel->where('game_id', $gameId)->get();
    }

    public function getGameUserInsertDataWithRandomRoleType(Game $game, array $gameUsers)
    {
        $roleTypeTable = $this->getRoleTypeTable();
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

    protected function getRoleTypeTable()
    {
        return [
            'civilian' => 1001,
            'werewolf' => 2001,
            'snowwolf' => 2002,
            'kingwolf' => 2003,
            'prophet' => 3001,
            'witch' => 3002,
            'knight' => 3003,
            'hunter' => 3004,
        ];
    }
}

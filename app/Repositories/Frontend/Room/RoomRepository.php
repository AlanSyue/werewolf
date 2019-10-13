<?php

namespace App\Repositories\Frontend\Room;

use Exception;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\DB;
use App\Models\Room\Room;
use App\Models\Game\Game;

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
    public function __construct(Room $model, Game $gameModel)
    {
        $this->model = $model;
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
}

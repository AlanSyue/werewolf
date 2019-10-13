<?php

namespace App\Repositories\Frontend\Game;

use App\Models\Game\GameUser;
use App\Repositories\BaseRepository;

/**
 * Class GameRepository.
 */
class GameUserRepository extends BaseRepository
{
    /**
     * GameUserRepository constructor.
     *
     * @param  GameUser  $model
     */
    public function __construct(GameUser $model)
    {
        $this->model = $model;
    }
}

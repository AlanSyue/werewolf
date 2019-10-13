<?php

namespace App\Repositories\Frontend\Game;

use App\Models\Game\Game;
use App\Repositories\BaseRepository;

/**
 * Class GameRepository.
 */
class GameRepository extends BaseRepository
{
    /**
     * GameRepository constructor.
     *
     * @param  Game  $model
     */
    public function __construct(Game $model)
    {
        $this->model = $model;
    }
}

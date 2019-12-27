<?php

namespace App\Repositories\Frontend\Game;

use App\Models\Game\Game;
use APp\Models\Game\GameUser;
use App\Repositories\BaseRepository;
use DB;

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
    public function __construct(
        Game $model
    )
    {
        $this->model = $model;
    }

    public function isWerewolf($gameId, $userId){
        return GameUser::where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['role_type', '>=', 2000],
            ['role_type', '<', 3000],
            ['is_live', 1]
        ])->exists();
    }

    public function killUser($gameId, $userId){
        return GameUser::where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['is_live', 1]
        ])->update([
            'is_live' => 0
        ]);
    }

    public function changeStage($gameId, $stage, $skillAllowedTarget){
        DB::beginTransaction();
        $updateCount = 0;
        $updateCount += Game::where([
                ['id', $gameId]
            ])->update([
                'stage' => $stage
            ]);

        $updateCount += GameUser::where([
                ['game_id', $gameId],
                ['is_live', 1]
            ])->update([
                'is_skill_allowed' => 0
            ]);

        $skillAllowedRoleTypeArr = $this->transladteRoleTypeByName($skillAllowedTarget);

        $updateCount += GameUser::whereIn('role_type',$skillAllowedRoleTypeArr)
            ->where([
                ['game_id', $gameId],
                ['is_live', 1],
            ])
            ->update([
                'is_skill_allowed' => 1
            ]);

        DB::commit();
        return $updateCount;
    }

    protected function transladteRoleTypeByName($arr){
        $result = [];
        foreach ($arr as $name) {
            switch ($name) {
                case 'werewolf':
                    $result[] = 2001;
                    $result[] = 2002;
                    $result[] = 2003;
                    break;
                case 'prophet':
                    $result[] = 3001;
                    break;
                case 'witch':
                    $result[] = 3002;
                    break;
                case 'knight':
                    $result[] = 3003;
                    break;
                default:
                    break;
            }
        }

        return $result;
    }
}

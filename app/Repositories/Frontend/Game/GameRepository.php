<?php

namespace App\Repositories\Frontend\Game;

use App\Models\Auth\User;
use App\Models\Game\Game;
use App\Models\Game\GameUser;
use App\Models\Game\GameLogs;
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
        Game $model,
        GameUser $gameUserModel,
        GameLogs $logModel
    )
    {
        $this->model = $model;
        $this->gameUserModel = $gameUserModel;
        $this->logModel = $logModel;
    }
    
    public function getGameUserById($id){
        return $this->gameUserModel->find($id);
    }

    public function getGameUsers($gameId)
    {
        return $this->gameUserModel->where('game_id', $gameId)->get();
    }

    public function getGameLogByGameId($gameId)
    {
        return $this->logModel->where('game_id', $gameId)->get();
    }

    public function getThisNightDeadUserIDs(Game $game)
    {
        return $this->logModel
            ->select('target_user_id')
            ->where([
                ['game_id', $game->id],
                ['day', $game->day],
                ['skill', 'werewolf']
            ])
            ->get()
            ->pluck('target_user_id');
    }

    public function isProphet($gameId, $userId)
    {
        $ROLE_TYPE = \Config::get('constants.role_type');
        return $this->gameUserModel->where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['role_type', $ROLE_TYPE['prophet']]
        ])->exists();
    }

    public function isWerewolfAndAlive($gameId, $userId)
    {
        return $this->gameUserModel->where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['role_type', '>=', 2000],
            ['role_type', '<', 3000],
            ['is_live', 1]
        ])->exists();
    }

    public function isWerewolf($gameId, $userId)
    {
        return $this->gameUserModel->where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['role_type', '>=', 2000],
            ['role_type', '<', 3000]
        ])->exists();
    }

    public function isAlive($gameId, $userId)
    {
        return $this->gameUserModel->where([
            ['game_id', $gameId],
            ['user_id', $userId],
            ['is_live', 1]
        ])->exists();
    }

    public function createKillUserLog(Game $game, User $user, $targetUserId)
    {
        return $this->logModel->create([
            'game_id' => $game->id,
            'stage' => $game->stage,
            'day' => $game->day,
            'skill' => 'werewolf',
            'user_id' => $user->id,
            'target_user_id' => $targetUserId
        ]);
    }

    public function createScenUserLog(Game $game, User $user, $targetUserId)
    {
        return $this->logModel->create([
            'game_id' => $game->id,
            'stage' => $game->stage,
            'day' => $game->day,
            'skill' => 'prophet',
            'user_id' => $user->id,
            'target_user_id' => $targetUserId
        ]);
    }

    public function killUsers($gameId, $userIds)
    {
        DB::beginTransaction();
        $updatedRows = $this->gameUserModel->where([
                ['game_id', $gameId],
                ['is_live', 1]
            ])->whereIn('user_id', $userIds)
            ->update([
                'is_live' => 0
            ]);

        if ($updatedRows !== count($userIds)) {
            throw new \Exception('伺服器錯誤');
        }

        DB::commit();
    }

    public function changeStage($gameId, $stage, $skillAllowedTarget, $isNextDay = false)
    {
        DB::beginTransaction();
        $updateCount = 0;

        $gameUpdatedArr = [
            'stage' => $stage
        ];
        if($isNextDay){
            $gameUpdatedArr['day'] = DB::raw('day + 1');
        }

        $updateCount += Game::where('id', $gameId)->update($gameUpdatedArr);
        $updateCount += $this->gameUserModel->where([
                ['game_id', $gameId],
                ['is_live', 1]
            ])->update([
                'is_skill_allowed' => 0
            ]);

        $skillAllowedRoleTypeArr = $this->transladteRoleTypeByName($skillAllowedTarget);
        $updateCount += $this->gameUserModel->whereIn('role_type',$skillAllowedRoleTypeArr)
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

    protected function transladteRoleTypeByName($arr)
    {
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

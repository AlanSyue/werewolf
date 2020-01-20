<?php

namespace App\Services\Frontend;

use App\Models\Auth\User;
use App\Events\Frontend\StageChanged;
use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;

class GameService
{
    public function __construct(
        RoomRepository $roomRepository,
        GameRepository $repository
    ) {
        $this->roomRepository = $roomRepository;
        $this->repository = $repository;
    }

    public function werewolfUseSkill(User $user, $gameId, $targetUserId)
    {
        $isWerewolf = $this->repository->isWerewolfAndAlive($gameId, $user->id);

        if (! $isWerewolf) {
            throw new \Exception('No Auth');
        }

        $game = $this->repository->getById($gameId);

        return $this->repository->createKillUserLog($game, $user, $targetUserId);
    }

    public function prophetUseSkill(User $user, $gameId, $targetUserId)
    {
        $isProphet = $this->repository->isProphet($gameId, $user->id);

        if (! $isProphet) {
            throw new \Exception('No Auth');
        }

        $game = $this->repository->getById($gameId);

        return $this->repository->createScenUserLog($game, $user, $targetUserId);
    }

    public function knightUseSkill(User $user, $gameId, $targetUserId)
    {
        $isKnight = $this->repository->isKnight($gameId, $user->id);

        if (! $isKnight) {
            throw new \Exception('No Auth');
        }

        $isWerewolf = $this->repository->isWerewolf($gameId, $targetUserId);
        $game = $this->repository->getById($gameId);

        if (! $isWerewolf) {
            $this->repository->killUsers($gameId, $user->id);
            return $this->repository->createKillUserLog($game, $user->id, $user->id);
        } else {
            $this->repository->killUsers($gameId, $targetUserId);
            return $this->repository->createKillUserLog($game, $user->id, $targetUserId);
        }
    }

    public function changeStage(User $user, $gameId, $stageName)
    {
        $isSuccess = false;
        $stage = 'morning';
        $skillAllowedTarget = [];
        $soundData = [];

        switch ($stageName) {
            case 'nightComing':
                $stage = 'night';
                $skillAllowedTarget = ['werewolf'];
                $soundData = [
                    ['method' => 'addSound', 'param' => '天黑請閉眼'],
                    ['method' => 'delay', 'param' => 3],
                    ['method' => 'addSound', 'param' => '狼人現身請睜眼，狼人請殺人'],
                ];
                $isNextDay = true;
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget,
                    $isNextDay
                );
                break;
            case 'werewolfEnd':
                $stage = 'night';
                $skillAllowedTarget = ['prophet'];
                $soundData = [
                    ['method' => 'addSound', 'param' => '狼人請閉眼'],
                    ['method' => 'delay', 'param' => 3],
                    ['method' => 'addSound', 'param' => '預言家請睜眼，你要查驗的對象是'],
                ];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                break;
            case 'prophetEnd':
                $stage = 'morning';
                $skillAllowedTarget = ['knight'];
                $soundData = [
                    ['method' => 'addSound', 'param' => '預言家請閉眼'],
                    ['method' => 'delay', 'param' => 3],
                    ['method' => 'addSound', 'param' => '天亮請睜眼'],
                    ['method' => 'delay', 'param' => 1],
                    ['method' => 'addSound', 'param' => '昨晚被淘汰的是這些玩家'],
                ];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                $this->commitNightResult($gameId);
            case 'knightEnd':

            default:
                // code...
                break;
        }

        if ($isSuccess) {
            $room = $this->roomRepository->getRoomByUserId($user->id);
            $game = $this->roomRepository->getGameByRoomId($room->id);
            $gameUsers = $this->repository->getGameUsers($game->id);
            $gameLogs = $this->repository->getGameLogByGameId($game->id);
            event(new StageChanged($room, $game, $gameUsers, $gameLogs, $soundData));
        } else {
            throw new \Exception('無成功更新遊戲階段');
        }
    }

    protected function commitNightResult($gameId)
    {
        $game = $this->repository->getById($gameId);
        $deadUserIds = $this->repository->getThisNightDeadUserIDs($game);
        $this->repository->killUsers($gameId, $deadUserIds);
    }
}

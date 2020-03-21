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
        $isWerewolfSkillAllowed = $this->repository->isWerewolfSkillAllowed($gameId, $user->id);

        if (! $isWerewolfSkillAllowed) {
            throw new \Exception('No Auth or skill used');
        }

        $game = $this->repository->getById($gameId);

        return $this->repository->createUserLog($game, $user, $targetUserId, 'werewolf');
    }

    public function prophetUseSkill(User $user, $gameId, $targetUserId)
    {
        $isProphetUser = $this->repository->isProphetUser($gameId, $user->id);

        if (! $isProphetUser) {
            throw new \Exception('No Auth');
        }

        $game = $this->repository->getById($gameId);

        return $this->repository->createUserLog($game, $user, $targetUserId, 'prophet');
    }

    public function knightUseSkill(User $user, $gameId, $targetUserId)
    {
        $isKnightUser = $this->repository->isKnightUser($gameId, $user->id);
        if (! $isKnightUser) {
            throw new \Exception('No Auth');
        }

        $isSkillUsed = $this->repository->isSkillUsed($gameId, $user->id);
        if ($isSkillUsed) {
            throw new \Exception('Skill Used');
        }       

        $isWerewolfUser = $this->repository->isWerewolfUser($gameId, $targetUserId);
        $game = $this->repository->getById($gameId);

        DB::beginTransaction();

        if ($isWerewolfUser) {
            $this->repository->killUsers($gameId, [$targetUserId]);
        }else{
            $this->repository->killUsers($gameId, [$user->id]);
        }
        $this->repository->createUserLog($game, $user, $targetUserId, 'knight');
        $success = $this->repository->setSkillUsed($game, $user);
        if(!$success){
            throw new \Exception('Updated Skill Error');
        }

        DB::commit();
    }

    public function changeStage(User $user, $gameId, $stageName, $targetUserId = null)
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
                $skillAllowedTarget = [];
                $isKnightSkillAllowed = $this->repository->isKnighSkillAllowed($gameId);
                if($isKnightSkillAllowed){
                    $skillAllowedTarget = ['knight'];
                }
                $soundData = [
                    ['method' => 'addSound', 'param' => '預言家請閉眼'],
                    ['method' => 'delay', 'param' => 3],
                    ['method' => 'addSound', 'param' => '天亮請睜眼'],
                    ['method' => 'delay', 'param' => 1],
                    ['method' => 'addSound', 'param' => '昨晚被淘汰的是這些玩家'],
                ];
                // TODO: 會回傳 0 ，要研究錯誤原因
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                $this->commitNightResult($gameId);
            case 'knightUseResult':
                $stage = 'morning';
                $skillAllowedTarget = ['knight'];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                break;
            case 'knightEnd': // 騎士尚未完成，待後續功能補上調整
                $stage = 'night';
                $skillAllowedTarget = ['werewolf'];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                break;
            case 'morningContinue':
                $stage = 'morning';
                $skillAllowedTarget = [];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                break;
            default:
                // code...
                break;
        }

        if ($isSuccess) {
            $room = $this->roomRepository->getRoomByUserId($user->id);
            $game = $this->roomRepository->getGameByRoomId($room->id);
            $gameUsers = $this->repository->getGameUsers($game->id);
            $gameLogs = $this->repository->getGameLogByGameId($game->id);
            $targetUserId = ['targetUserId' => $targetUserId];
            event(new StageChanged($room, $game, $gameUsers, $gameLogs, $soundData, $targetUserId));
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

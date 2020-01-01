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
        $isWerewolf = $this->repository->isWerewolf($gameId, $user->id);

        if (! $isWerewolf) {
            throw new \Exception('No Auth');
        }

        return $this->repository->killUser($gameId, $targetUserId);
    }

    public function changeStage(User $user, $gameId, $stageName)
    {
        $isSuccess = false;
        switch ($stageName) {
            case 'nightComing':
                $stage = 'night';
                $skillAllowedTarget = ['werewolf'];
                $soundData=[
                    ['method'=>'addSound', 'param'=>'天黑請閉眼'],
                    ['method'=>'delay', 'param'=>3],
                    ['method'=>'addSound', 'param'=>'狼人現身請睜眼，狼人請殺人'],
                ];
                $isSuccess = $this->repository->changeStage(
                    $gameId,
                    $stage,
                    $skillAllowedTarget
                );
                break;
            case 'werewolfEnd':
                $stage = 'morning';
                $skillAllowedTarget = ['knight'];
                $soundData=[
                    ['method'=>'addSound', 'param'=>'狼人請閉眼'],
                    ['method'=>'delay', 'param'=>3],
                    ['method'=>'addSound', 'param'=>'天亮請睜眼'],
                    ['method'=>'delay', 'param'=>1],
                    ['method'=>'addSound', 'param'=>'昨晚被淘汰的是這些玩家'],
                ];
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
        // if($isSuccess){
            $room = $this->roomRepository->getRoomByUserId($user->id);
            $game = $this->roomRepository->getGameByRoomId($room->id);
            $gameUsers = $this->roomRepository->getGameUsers($game->id);
            event(new StageChanged($room, $game ,$gameUsers, $soundData));
        // }else{
        //    throw new \Exception('無成功更新遊戲階段');
        // }
    }
}

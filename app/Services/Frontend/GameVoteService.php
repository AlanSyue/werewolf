<?php

namespace App\Services\Frontend;

use App\Models\Auth\User;
use App\Services\Frontend\GameService;
use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;
use App\Events\Frontend\GameVote\Voted;

class GameVoteService
{
    protected $gameService;
    protected $repository;
    protected $roomRepository;

    public function __construct(
        GameService $gameService,
        GameRepository $repository,
        RoomRepository $roomRepository
    ) {
        $this->gameService = $gameService;
        $this->repository = $repository;
        $this->roomRepository = $roomRepository;
    }

    public function showModel(User $user, $gameId)
    {
        $stageName = 'vote';
        
        $game = $this->repository->getById($gameId);
        $isRoomManager = $this->roomRepository->isRoomManager($game->room_id, $user->id);
        if(!$isRoomManager){
            throw new \Exception('發起投票者需要是室長權限');
        }

        $this->gameService->changeStage($user, $gameId, $stageName);
        return true;
    }

    public function vote(User $user, $gameId, $targetUserId)
    {
        $isAlive = $this->repository->isUserAlive($gameId, $user->id);
        if(!$isAlive){
            throw new \Exception('投票者權限錯誤');
        }
        $isTargetAlive = $this->repository->isUserAlive($gameId, $targetUserId);
        if(!$isTargetAlive){
            throw new \Exception('投票對象不是允許的對象');
        }
        $game = $this->repository->getById($gameId);
        $this->repository->createUserLog($game, $user, $targetUserId, 'vote');
        $gameLogs = $this->repository->getGameLogs($gameId);
        event(new Voted($game, $gameLogs->toArray()));
        return true;
    }
}

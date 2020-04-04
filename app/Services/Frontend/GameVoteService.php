<?php

namespace App\Services\Frontend;

use App\Models\Auth\User;
use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;
use App\Events\Frontend\GameVote\VoteModelShowed;
use App\Events\Frontend\GameVote\Voted;

class GameVoteService
{
    protected $repository;
    protected $roomRepository;

    public function __construct(
        GameRepository $repository,
        RoomRepository $roomRepository
    ) {
        $this->repository = $repository;
        $this->roomRepository = $roomRepository;
    }

    public function showModel(User $user, $gameId)
    {

        $isAlive = $this->repository->isUserAlive($gameId, $user->id);
        if(!$isAlive){
            throw new \Exception('發起投票者權限錯誤');
        }

        $room = $this->roomRepository->getRoomByUserId($user->id);
        event(new VoteModelShowed($room));
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
        event(new Voted($game, $gameLogs));
        return true;
    }
}

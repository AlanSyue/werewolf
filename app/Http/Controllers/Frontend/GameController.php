<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Frontend\GameService;
use Symfony\Component\HttpFoundation\Request;
use App\Repositories\Frontend\Game\GameRepository;

class GameController extends Controller
{
    public function __construct(
        GameService $service,
        GameRepository $repository
    ) {
        $this->service = $service;
        $this->repository = $repository;
    }

    public function startGame(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required'
        ]);
        $user = Auth::user();
        $gameId = $request->input('gameId');
        try {
            $this->service->changeStage($user, $gameId, 'nightComing');
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function useSkillWerewolf(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required',
            'targetUserId' => 'required',
        ]);
        $gameId = $request->input('gameId');
        $targetUserId = $request->input('targetUserId');

        $user = Auth::user();
        try {
            $isSuccess = $this->service->werewolfUseSkill($user, $gameId, $targetUserId);

            if (! $isSuccess) {
                throw new \Exception('更新錯誤');
            }
            $this->service->changeStage($user, $gameId, 'werewolfEnd');
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function useSkillProphet(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required',
            'targetUserId' => 'required',
        ]);
        $gameId = $request->input('gameId');
        $targetUserId = $request->input('targetUserId');
        $user = Auth::user();
        try {
            $isSuccess = $this->service->prophetUseSkill($user, $gameId, $targetUserId);
            if (! $isSuccess) {
                throw new \Exception('更新錯誤');
            }
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function useSkillProphetEnd(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required'
        ]);
        $gameId = $request->input('gameId');
        $user = Auth::user();
        try {
            $isProphetUser = $this->repository->isProphetUser($user, $gameId);
            $this->service->changeStage($user, $gameId, 'prophetEnd');
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function useSkillKnight(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required',
            'targetUserId' => 'required',
        ]);
        $gameId = $request->input('gameId');
        $targetUserId = $request->input('targetUserId');
        
        $user = Auth::user();

        try {
            $this->service->knightUseSkill($user, $gameId, $targetUserId);
            $this->service->changeStage($user, $gameId, 'knightUseResult', $targetUserId);
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function useSkillKnightEnd(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required'
        ]);
        $gameId = $request->input('gameId');
        $user = Auth::user();
        try {
            $isKnight = $this->repository->isKnight($user, $gameId);
            $game = $this->repository->getById($gameId);
            $deadUserIds = $this->repository->getKnightKillUserId($game);
            $isWerewolf = $this->repository->isWerewolf($gameId, $deadUserIds);
            if ($isWerewolf) {
                $this->service->changeStage($user, $gameId, 'knightEnd');
            } else {
               $this->service->changeStage($user, $gameId, 'morningContinue'); 
            }
            
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }
}

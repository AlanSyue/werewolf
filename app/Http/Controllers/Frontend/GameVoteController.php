<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Request;
use App\Services\Frontend\GameVoteService;

class GameVoteController extends Controller
{
    public function __construct(
        GameVoteService $service
    ) {
        $this->service = $service;
    }

    public function show(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required'
        ]);
        $user = Auth::user();
        $gameId = $request->input('gameId');
        try {
            $this->service->showModel($user, $gameId);
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }

    public function action(Request $request)
    {
        $this->validate($request, [
            'gameId' => 'required',
            'targetUserId' => 'required',
        ]);
        $user = Auth::user();
        $gameId = $request->input('gameId');
        $targetUserId = $request->input('targetUserId');
        try {
            $this->service->vote($user, $gameId, $targetUserId);
            return 'ok';
        } catch (\Exception $e) {
            \Log::error($e);
            abort(400, '伺服器忙碌中');
        }
    }
}

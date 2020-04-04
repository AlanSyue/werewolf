<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Auth\User;
use App\Models\Room\Room;
use App\Models\Game\Game;
use App\Models\Game\GameUser;
use App\Services\Frontend\GameVoteService;
use Illuminate\Support\Facades\Event;
use App\Repositories\Frontend\Game\GameRepository;
use App\Repositories\Frontend\Room\RoomRepository;
use App\Events\Frontend\GameVote\VoteModelShowed;
use App\Events\Frontend\GameVote\Voted;

class GameVoteServiceTest extends TestCase
{
    protected $service;
    protected $repository;
    protected $roomRepository;

    protected function setUp() : void
    {
        parent::setUp();
        $this->repository = \Mockery::mock(GameRepository::class);
        $this->roomRepository = \Mockery::mock(RoomRepository::class);
        $this->service = new GameVoteService(
            $this->repository,
            $this->roomRepository
        );
    }

    protected function tearDown(): void
    {
        \Mockery::close();
    }

    /** @test */
    public function showModel_method_can_trigger_event_for_showing_vote_modal()
    {
        Event::fake();
        $userId = 1;
        $gameId = 2;
        $user = factory(User::class)->make(['id' => $userId]);
        $room = factory(Room::class)->make(['id' => 999, 'user_id' => $userId]);
        $this->repository
            ->shouldReceive('isUserAlive')
            ->andReturn(true);
        $this->roomRepository
            ->shouldReceive('getRoomByUserId')
            ->andReturn($room);
        $this->service->showModel($user, $gameId);
        Event::assertDispatched(VoteModelShowed::class);
    }

    /** @test */
    public function showModel_method_will_throw_error_when_user_is_not_alive()
    {
        Event::fake();
        $userId = 1;
        $gameId = 2;
        $user = factory(User::class)->make(['id' => $userId]);
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('發起投票者權限錯誤');
        $this->repository
            ->shouldReceive('isUserAlive')
            ->with($gameId, $userId)
            ->andReturn(false);
        $this->service->showModel($user, $gameId);
        Event::assertNotDispatched(VoteModelShowed::class);
        
    }

    /** @test */
    public function vote_method_will_throw_error_when_user_is_not_alive()
    {
        Event::fake();
        $userId = 1;
        $targetUserId = 2;
        $gameId = 1000;
        $user = factory(User::class)->make(['id' => $userId]);
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('投票者權限錯誤');
        $this->repository
            ->shouldReceive('isUserAlive')
            ->with($gameId, $userId)
            ->andReturn(false);
        $this->service->vote($user, $gameId, $targetUserId);
        Event::assertNotDispatched(Voted::class);
    }

    /** @test */
    public function vote_method_will_throw_error_when_target_user_is_not_alive()
    {
        Event::fake();
        $userId = 1;
        $targetUserId = 2;
        $gameId = 1000;
        $user = factory(User::class)->make(['id' => $userId]);
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('投票對象不是允許的對象');

        $this->repository
            ->shouldReceive('isUserAlive')
            ->with($gameId, $userId)
            ->andReturn(true);
        
        $this->repository
            ->shouldReceive('isUserAlive')
            ->with($gameId, $targetUserId)
            ->andReturn(false);

        $this->service->vote($user, $gameId, $targetUserId);
        Event::assertNotDispatched(Voted::class);
    }

    /** @test */
    public function vote_method_will_success_and_trigger_Voted_event()
    {
        Event::fake();
        $userId = 1;
        $targetUserId = 2;
        $gameId = 1000;
        $user = factory(User::class)->make(['id' => $userId]);
        $game = factory(Game::class)->make();
        $gameLogs = [
            factory(GameUser::class),
            factory(GameUser::class),
            factory(GameUser::class)
        ];

        $this->repository
            ->shouldReceive('isUserAlive')
            ->andReturn(true);

        $this->repository
            ->shouldReceive('getById')
            ->andReturn($game);

        $this->repository
            ->shouldReceive('createUserLog')
            ->with($game, $user, $targetUserId, 'vote');

        $this->repository
            ->shouldReceive('getGameLogs')
            ->andReturn($gameLogs);
        
        $this->service->vote($user, $gameId, $targetUserId);
        Event::assertDispatched(Voted::class, function ($e) use ($gameLogs) {
            return $e->gameLogs === $gameLogs;
        });
    }
}
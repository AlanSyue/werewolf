<?php

namespace Tests\Feature\Frontend;

use Tests\TestCase;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Auth\User;
use App\Models\Room\Room;
use App\Models\Room\RoomUser;
use App\Models\Game\Game;
use App\Models\Game\GameUser;
use App\Events\Frontend\StageChanged;
use App\Events\Frontend\GameVote\Voted;

class GameVoteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_GameVoteController_show_success()
    {
        // Setup
        Event::fake();
        $expectedStage = 'vote';
        $user = factory(User::class)->create(['password' => '1234']);
        $room = factory(Room::class)->create(['user_id' => $user->id]);
        $game = factory(Game::class)->state('standard')->create([
            'stage' => 'morning',
            'room_id' => $room->id
        ]);
        factory(RoomUser::class)->create([
            'room_id' => $room->id,
            'user_id' => $user->id
        ]);
        factory(GameUser::class)->create([
            'game_id' => $game->id,
            'user_id' => $user->id
        ]);

        // Exercise
        $this->actingAs($user)
            ->post('/game/vote/show', [
                'gameId' => $game->id
            ])
            ->assertStatus(200);

        // Verify
        Event::assertDispatched(StageChanged::class, function ($e) use ($expectedStage) {
            return $e->game->stage === $expectedStage;
        });
    }

    /** @test */
    public function test_GameVoteController_action_success()
    {
        // Setup
        Event::fake();
        $user = factory(User::class)->create(['password' => '1234']);
        $targetUser = factory(User::class)->create(['password' => '1234']);
        $room = factory(Room::class)->create(['user_id' => $user->id]);
        $game = factory(Game::class)->state('standard')->create(['room_id' => $room->id]);
        $expect = [
            'game_id' => $game->id,
            'skill' => 'vote',
            'user_id' => $user->id,
            'target_user_id' => $targetUser->id
        ];

        factory(RoomUser::class)->create([
            'room_id' => $room->id,
            'user_id' => $user->id
        ]);
        factory(RoomUser::class)->create([
            'room_id' => $room->id,
            'user_id' => $targetUser->id
        ]);
        factory(GameUser::class)->create([
            'game_id' => $game->id,
            'user_id' => $user->id
        ]);
        factory(GameUser::class)->create([
            'game_id' => $game->id,
            'user_id' => $targetUser->id
        ]);
        $this->assertDatabaseMissing('game_logs', $expect);

        // Exercise
        $this->actingAs($user)
            ->post('/game/vote/action', [
                'gameId' => $game->id,
                'targetUserId' => $targetUser->id
            ])
            ->assertStatus(200);

        // Verify
        $this->assertDatabaseHas('game_logs', $expect);
        Event::assertDispatched(Voted::class);
    }
}

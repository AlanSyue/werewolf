<?php

namespace Tests\Feature\Frontend;

use Tests\TestCase;
use App\Models\Auth\User;
use Illuminate\Support\Facades\Event;
use App\Events\Frontend\GameVote\VoteModelShowed;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Room\Room;
use App\Models\Game\Game;

class GameVoteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_account_can_confirm_his_email()
    {
        Event::fake();

        $user = factory(User::class)->create(['password' => '1234']);
        $room = factory(Room::class)->create(['user_id' => $user]);
        $game = factory(Game::class)->state('standard')->create(['room_id' => $room->id]);

        $response = $this->actingAs($user)
            ->post('/game/show', [
                'gameId' => $game->id
            ]);

        Event::assertDispatched(VoteModelShowed::class);
    }
}

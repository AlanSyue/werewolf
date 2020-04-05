<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Game\Game;
use App\Models\Game\GameUser;
use App\Services\Frontend\RoomService;
use App\Repositories\Frontend\Room\RoomRepository;

class RoomServiceTest extends TestCase
{
    protected $roomService;

    protected function setUp() : void
    {
        parent::setUp();
        $roomRepository = \Mockery::mock(RoomRepository::class);
        $this->roomService = new RoomService($roomRepository);
    }

    /** @test */
    public function it_can_generate_game_user()
    {
        $roleTypes = \Config::get('constants.role_type');
        $expectedGameUserRoles = [
            $roleTypes['civilian'],
            $roleTypes['civilian'],
            $roleTypes['civilian'],
            $roleTypes['civilian'],
            $roleTypes['prophet'],
            $roleTypes['witch'],
            $roleTypes['knight'],
            $roleTypes['hunter'],
            $roleTypes['kingwolf'],
            $roleTypes['werewolf'],
            $roleTypes['werewolf']
        ];
        $game = factory(Game::class)->states('standard')->make();
        $gameUsers = factory(GameUser::class, count($expectedGameUserRoles))->make()->toArray();
        $actual = $this->roomService->generateGameUserInsert($game, $gameUsers);
        $actualGameUserRoles = array_map(function($gameuser){
            return $gameuser['role_type'];
        }, $actual);
        $this->assertEquals(
            sort($expectedGameUserRoles),
            sort($actualGameUserRoles),
            '可以依照 Game 產出對應的角色類別'
        );
    }
}

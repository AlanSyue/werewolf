<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSkillColumnForVoteSkillInGameLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('game_logs', function (Blueprint $table) {
            $table->dropColumn('skill');
        });

        Schema::table('game_logs', function (Blueprint $table) {
            $table->enum('skill', ['werewolf', 'witch_antidote', 'witch_poison', 'prophet', 'knight', 'hunter', 'vote'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('game_logs', function (Blueprint $table) {
            $table->dropColumn('skill');
        });

        Schema::table('game_logs', function (Blueprint $table) {
            $table->enum('skill', ['werewolf', 'witch_antidote', 'witch_poison', 'prophet', 'knight', 'hunter']);
        });
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGameLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('game_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('target_user_id')->index();
            $table->enum('skill', ['werewolf', 'witch_antidote', 'witch_poison', 'prophet', 'knight', 'hunter']);
            $table->enum('stage', ['idle', 'night', 'morning', 'vote'])->default('idle');
            $table->smallInteger('day')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_logs');
    }
}

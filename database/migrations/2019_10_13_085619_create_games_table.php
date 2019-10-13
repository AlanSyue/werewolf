<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('room_id')->index();
            $table->unsignedTinyInteger('status')->default(1);
            $table->unsignedTinyInteger('civilian_amount');
            $table->unsignedTinyInteger('werewolf_amount');
            $table->unsignedTinyInteger('snowwolf_amount');
            $table->unsignedTinyInteger('kingwolf_amount');
            $table->unsignedTinyInteger('prophet_amount');
            $table->unsignedTinyInteger('witch_amount');
            $table->unsignedTinyInteger('knight_amount');
            $table->unsignedTinyInteger('hunter_amount');
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
        Schema::dropIfExists('games');
    }
}

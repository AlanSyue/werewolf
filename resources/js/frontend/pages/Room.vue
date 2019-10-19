<template>

    <section id="game">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-9">
                    <div class="container seat_area">
                        <div class="row">
                            <div class="col">
                                <div class="row seat_heaㄎer">
                                    <h5>房間: {{room.pin_code}}</h5>
                                    <el-row v-if="room.mayor_user_id == auth.id">
                                        <el-button v-if="isValidSeatSetting" @click="startGame" type="success" plain>開始遊戲</el-button>
                                        <el-button v-else :disabled="isUserDuplicatedInSeats" @click="updateRoomSeats" type="primary" plain>{{isUserDuplicatedInSeats? '玩家位置重複' : '確認座位'}}</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="gameUser in gameUsers" :key="gameUser.seat_index" class=" col-4 col-lg-3">
                                <div class="seat_unit">
                                    <label for="">{{gameUser.seat_id}}</label>
                                    <div class="dummy"></div>
                                    <el-select v-if="room.mayor_user_id == auth.id" @change="changeSeat" v-model="gameUser.user_id" placeholder='未選擇'>
                                        <el-option
                                        v-for="user in roomUsers"
                                        :key="user.id"
                                        :label="user.first_name"
                                        :value="user.id">
                                        </el-option>
                                    </el-select>
                                    <el-button v-else>{{(gameUser.user_id)? roomUserObject[gameUser.user_id].first_name: '未選擇'}}</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3">
                    <div class="container wait_area">
                        <div class="row">
                            <div class="list-group">
                                <button type="button" class="list-group-item list-group-item-action list-group-item-danger">
                                    狼人陣營：{{ game.werewolf_amount + game.snowwolf_amount + game.snowwolf_amount}} 名
                                </button>
                                <button type="button" class="list-group-item list-group-item-action">一般狼人： {{game.werewolf_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">雪狼： {{game.snowwolf_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">狼王： {{game.snowwolf_amount}}</button>
                            </div>
                            <div class="list-group">
                                <button type="button" class="list-group-item list-group-item-action list-group-item-info">
                                    好人陣型：{{game.civilian_amount+game.prophet_amount+game.hunter_amount+game.knight_amount+game.witch_amount}} 名
                                </button>
                                <button type="button" class="list-group-item list-group-item-action">平民： {{game.civilian_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">預言家 {{game.prophet_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">獵人 {{game.hunter_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">騎士 {{game.knight_amount}}</button>
                                <button type="button" class="list-group-item list-group-item-action">女巫 {{game.witch_amount}}</button>
                            </div>
                            <div class="list-group">
                                <button type="button" class="list-group-item list-group-item-action list-group-item-dark">
                                    玩家名單
                                </button>
                                <div class="container">
                                    <div class="row">
                                        <div v-for="user in roomUsers" :key="user.id" class="wait_user col-3 col-lg-4">
                                            <p>{{user.first_name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script src="./Room.js"></script>

<template>
    <section id="game">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-9">
                    <div class="container seat_area">
                        <div class="row">
                            <div class="col">
                                <div class="row seat_header">
                                    <h5>房間: {{room.pin_code}}</h5>
                                    <div v-if="room.mayor_user_id == auth.id">
                                            <button type="button" class="btn btn-outline-success" >更新</button>
                                            <button type="button" class="btn btn-outline-warning" >確認</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="seat in roomSeats" :key="seat.id" class=" col-3 col-lg-2">
                                <div class="seat_unit">
                                    <label for="">{{seat.id}}</label>
                                    <div class="dummy"></div>
                                    <select class="seat_input" v-model="seat.user_id">
                                        <option value="0">未選擇</option>
                                        <option v-for="user in roomUsers" v-bind:key="user.id" v-bind:value="user.id">
                                            {{ user.first_name }}
                                        </option>
                                    </select>
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

<script src="./game.js"></script>

<template>
    <section id="room">
        <div class="seat-area">
            <el-row class="seat-list">
                <el-col :span="8" v-for="gameUser in gameUsers" :key="gameUser.seat_index">
                    <el-select v-if="room.mayor_user_id == auth.id" @change="changeSeat" v-model="gameUser.user_id" placeholder='未選擇'>
                        <el-option
                        v-for="user in roomUsers"
                        :key="user.id"
                        :label="user.first_name"
                        :value="user.id">
                        </el-option>
                    </el-select>
                    <el-button v-else>{{(gameUser.user_id)? roomUserObject[gameUser.user_id].first_name: '未選擇'}}</el-button>
                </el-col>
            </el-row>
        </div>

        <el-row type="flex">
            <el-col :span="6">
                <span>角色配置</span>
            </el-col>
        </el-row>
        <el-row class="role-description" type="flex">
            <el-col :span="4"><span>神職</span></el-col>
            <el-col :span="4"><el-tag v-bind:type="game.prophet_amount > 0 ? 'primary' : 'info' " >預言家</el-tag></el-col>
            <el-col :span="4"><el-tag v-bind:type="game.witch_amount > 0 ? 'primary' : 'info' " >女巫</el-tag></el-col>
            <el-col :span="4"><el-tag v-bind:type="game.knight_amount > 0 ? 'primary' : 'info' " >騎士</el-tag></el-col>
            <el-col :span="4"><el-tag v-bind:type="game.hunter_amount > 0 ? 'primary' : 'info' " >獵人</el-tag></el-col>
            <el-col :span="4"><el-button type="text" @click="godDescriptionDialogVisible = true">查看</el-button></el-col>
        </el-row>
        <el-row class="role-description" type="flex">
            <el-col :span="4"><span>狼人</span></el-col>
            <el-col :span="4"><el-tag v-bind:type="game.kingwolf_amount > 0 ? '：' : 'info' " >狼王</el-tag></el-col>
            <el-col :span="12"><el-tag type="primary" >狼人: {{game.werewolf_amount}}</el-tag></el-col>
            <el-col :span="4"><el-button type="text" @click="werewolfDescriptionDialogVisible = true">查看</el-button></el-col>
        </el-row>
        <el-row class="role-description" type="flex">
            <el-col :span="4"><span>其他</span></el-col>
            <el-col :span="16"><el-tag type="primary" >平民: {{game.civilian_amount}}</el-tag></el-col>
            <el-col :span="4"><el-button type="text" @click="civilianDescriptionDialogVisible = true">查看</el-button></el-col>
        </el-row>
        <el-footer class="bg-gray">
            <el-row type="flex">
                <el-col :span="8">
                    <span>房號：{{room.pin_code}}</span>
                </el-col>
                <el-col :span="8">
                    <span>人數：{{roomUsers.length}}</span>
                </el-col>
                <el-col :span="8" v-if="room.mayor_user_id == auth.id">
                    <el-button v-if="isValidSeatSetting" @click="startGame" type="success" width="100" plain>開始遊戲</el-button>
                    <el-button v-else :disabled="isUserDuplicatedInSeats" @click="updateRoomSeats" type="primary" plain>{{isUserDuplicatedInSeats? '玩家位置重複' : '確認座位'}}</el-button>
                </el-col>
            </el-row>
        </el-footer>

        <el-dialog
            title="神職角色"
            :visible.sync="godDescriptionDialogVisible"
            width="90%"
            center>
            <p>預言家：夜晚時可以查驗一名玩家身份，能知道此玩家是好人或壞人</p>
            <p>女巫：夜晚時可使用解藥或毒藥、兩瓶藥都只能使用一次，且不能在同個夜晚同時使用</p>
            <p>獵人：如果被狼人或白日投票出局，則可帶走一人</p>
            <p>騎士：白天時可以啟動技能驗證一名玩家身份，如是狼人則擊殺，如是好人則以死謝罪</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="godDescriptionDialogVisible = false">知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="狼人角色"
            :visible.sync="werewolfDescriptionDialogVisible"
            width="90%"
            center>
            <p>狼王：除被女巫毒殺以外，在出局時可以選擇一民玩家一起出局</p>
            <p>狼人：夜晚可以與其他狼隊友討論暗殺掉一名玩家</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="werewolfDescriptionDialogVisible = false">知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="神職角色"
            :visible.sync="civilianDescriptionDialogVisible"
            width="90%"
            center>
            <p>人民：無任何技能</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="civilianDescriptionDialogVisible = false">知道了</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script src="./Room.js"></script>

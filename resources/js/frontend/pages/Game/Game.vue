<template>
    <section id="game" :class="{ 'night-mode': game.stage == 'night' || false }">
        <div class="main">
            <div class="seat-area">
                <el-col :span="6" v-for="gameUser in GameUsers" :key="gameUser.seatIndex" class="justify-center square">
                    <el-tag :type="(gameUser.isLive) ? '' : 'danger' ">
                        <span class="index">{{gameUser.seatIndex}}</span>
                        <span>{{
                            gameUser.isLive ?
                            userMap[gameUser.userId].firstName :
                            '死亡'
                        }}</span>
                    </el-tag>
                </el-col>
            </div>
            <div v-if="Me.isRoomManager && isGameStarted == false">
                <el-button :loading="loading" @click="startGame" type="success" plain>開始遊戲</el-button>
            </div>
        </div>
        <el-footer class="bg-gray">
            <el-row type="flex">
                <el-col :span="8">
                    <el-button
                        :loading="loading"
                        @click="roleDialogVisible = true"
                        >查看角色</el-button
                    >
                </el-col>
                <el-col :span="8">
                    <el-button
                        :loading="loading"
                        @click="showSkillDialog"
                        >使用技能</el-button
                    >
                </el-col>
                <el-col :span="8">
                    <el-button
                        :loading="loading"
                        @click="gameRecordDialogVisible = true"
                        >遊戲紀錄</el-button
                    >
                </el-col>
            </el-row>
        </el-footer>

        <el-dialog
            title="你的角色是"
            :visible.sync="roleDialogVisible"
            width="90%"
            center
        >
            <h3>{{ (auth && Me) ? Me.role.name : ""}} </h3>
            <p>{{ (auth && Me) ? Me.role.introducation : "" }}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="roleDialogVisible = false"
                    >知道了</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="技能使用"
            :visible.sync="werewolfSkillDialogVisible"
            width="90%"
            center
        >
            <h3>狼人陣營</h3>
            <p>選擇·對象</p>
            <div class="seat-area">
                <el-col :xs="6" :sm="6" :md="4" :lg="3" v-for="gameUser in GameUsers" :key="gameUser.seatIndex" class="justify-center square">
                    <el-radio class="kill-radio-btn" :disabled="!(gameUser.isLive)" v-model="werewolfKillUserId" :label="gameUser.userId" border>
                        <span :class="['index',{'werewolf': gameUser.role.enName == 'werewolf'}]">
                            {{(gameUser.isWereworlf)? '狼人' : gameUser.seatIndex}}
                        </span>
                        <span>{{
                            gameUser.isLive ?
                            userMap[gameUser.userId].firstName :
                            '死亡'
                        }}</span>
                    </el-radio>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary"
                    :loading="loading"
                    @click="useWerelfSkill"
                    >確認</el-button
                >
                <el-button type="primary" @click="werewolfSkillDialogVisible = false"
                    >關閉</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="遊戲過程"
            :visible.sync="gameRecordDialogVisible"
            width="90%"
            center
        >
            <p>第一夜晚結果：平安夜</p>
            <p>
                第一白天結果：1號驅逐
                <el-button>查看票型</el-button>
            </p>
            <p>第二夜晚結果：2號死亡</p>
            <p>
                第一白天結果：3號驅逐
                <el-button>查看票型</el-button>
            </p>
            <p>第二夜晚結果：4、5號死亡</p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="gameRecordDialogVisible = false"
                    >關閉</el-button
                >
            </span>
        </el-dialog>
    </section>
</template>

<script src="./Game.js"></script>

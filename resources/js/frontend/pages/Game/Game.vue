<template>
    <section
        id="game"
        :class="{ 'night-mode': game.stage == 'night' || false }"
    >
        <div class="header">
            <h3>{{ room.pinCode }} 室</h3>
            <a @click="backToHome" class="leave-game-btn">離開房間</a>
        </div>
        <div class="seat-wrapper">
            <SeatList :theme="'gameuser'" :seats="seats" />
        </div>

        <div class="action-wrapper">
            <Button
                v-if="Me && Me.isRoomManager && !isGameStarted"
                @onClick="startGame"
            >
                開始遊戲
            </Button>
        </div>

        <el-footer class="footer">
            <el-row type="flex">
                <el-col :span="8">
                    <div
                        class="icon-btn"
                        @click="roleDialogVisible = true"
                    >
                        <span class="icon"></span>
                        <span class="content">查看角色</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div
                        :class="['icon-btn']"
                        @click="showSkillDialog"
                    >
                        <span class="icon"></span>
                        <span class="content">使用技能</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div
                        :class="['icon-btn']"
                        @click="gameRecordDialogVisible = true"
                    >
                        <span class="icon"></span>
                        <span class="content">遊戲紀錄</span>
                    </div>
                </el-col>
            </el-row>
        </el-footer>

        <el-dialog
            title="你的角色是"
            :visible.sync="roleDialogVisible"
            width="90%"
            center
        >
            <h3>{{ auth && Me ? Me.role.name : "" }}</h3>
            <p>{{ auth && Me ? Me.role.introducation : "" }}</p>
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
            <div class="select-area">
                <el-radio
                    v-for="gameUser in GameUsers"
                    :key="gameUser.seatIndex"
                    class="kill-radio-btn"
                    :disabled="!gameUser.isLive"
                    v-model="werewolfKillUserId"
                    :label="gameUser.userId"
                    border
                >
                    <span
                        :class="[
                            'index',
                            { werewolf: gameUser.role.enName == 'werewolf' }
                        ]"
                    >
                        {{ gameUser.isWereworlf ? "狼人" : gameUser.seatIndex }}
                    </span>
                    <span>{{
                        gameUser.isLive
                            ? userMap[gameUser.userId].firstName
                            : "死亡"
                    }}</span>
                </el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="useWerewolfSkill"
                    >確認</el-button
                >
                <el-button
                    type="primary"
                    @click="werewolfSkillDialogVisible = false"
                    >關閉</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="技能使用"
            :visible.sync="prophetSkillDialogVisible"
            width="90%"
            center
        >
            <h3>好人陣營</h3>
            <p>選擇查驗對象</p>
            <div class="select-area">
                <el-radio
                    v-for="gameUser in GameUsers"
                    :key="gameUser.seatIndex"
                    class="scan-radio-btn"
                    :disabled="
                        isScanedTonight ||
                            gameUser.userId == Me.userId ||
                            !gameUser.isLive ||
                            prophetScanedUserIds.indexOf(gameUser.userId) >
                                -1 ||
                            scanResultBackupUserIds.indexOf(gameUser.userId) >
                                -1
                    "
                    v-model="scanUserId"
                    :label="gameUser.userId"
                    border
                >
                    <span
                        :class="[
                            'index',
                            { werewolf: gameUser.role.enName == 'werewolf' }
                        ]"
                    >
                        {{ gameUser.seatIndex }}
                        {{
                            scanResultBackupUserIds.indexOf(gameUser.userId) >
                                -1 ||
                            prophetScanedUserIds.indexOf(gameUser.userId) >
                                -1 ||
                            gameUser.userId == Me.userId
                                ? gameUser.role.name
                                : ""
                        }}
                    </span>
                    <span>{{
                        gameUser.isLive
                            ? userMap[gameUser.userId].firstName
                            : "死亡"
                    }}</span>
                </el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="useProphetSkill"
                    >確認</el-button
                >
                <el-button type="primary" @click="closeProphetSkillDialog"
                    >關閉</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="技能使用"
            :visible.sync="knightSkillDialogVisible"
            width="90%"
            center
        >
            <h3>好人陣營</h3>
            <p>選擇查驗對象</p>
            <div class="select-area">
                <el-radio
                    v-for="gameUser in GameUsers"
                    :key="gameUser.gameUser"
                    class="scan-radio-btn"
                    :disabled="!gameUser.isLive"
                    v-model="knightKillUserId"
                    :label="gameUser.userId"
                    border
                >
                    <span>{{
                        gameUser.isLive ?
                        userMap[gameUser.userId].firstName :
                        '死亡'
                    }}</span>
                </el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary"
                    :loading="loading"
                    @click="useKnightSkill"
                    >確認</el-button
                >
                <el-button type="primary" @click="knightSkillDialogVisible = false"
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

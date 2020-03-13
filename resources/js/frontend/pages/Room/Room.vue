<template>
    <section id="room">
        <ContentWrapper
            :showGoBackBtn="wapperConfig.showGoBackBtn"
            :goBackBtnText="wapperConfig.goBackBtnText"
            :goBackBtnEvent="wapperConfig.goBackBtnEvent"
            :showCoverView="wapperConfig.showCoverView"
            :coverViewText="wapperConfig.coverViewText"
            :actionBtnText="wapperConfig.actionBtnText"
            :actionDisabled="wapperConfig.actionDisabled"
            :actionBtnEvent="wapperConfig.actionBtnEvent"
        >
            <h3>{{ room.pinCode }} 室</h3>
            <SeatList :seats="seats" />
            <h4>
                角色配置
                <span class="font-h5 update-game-btn">變更</span>
            </h4>
            <div class="game">
                <div class="game-row">
                    <span class="game-row-name">
                        <h5>神職</h5>
                    </span>
                    <span
                        class="game-row-content"
                        @click="godDescriptionDialogVisible = true"
                    >
                        <div v-if="game.prophetAmount" class="tag">預言</div>
                        <div v-if="game.witchAmount" class="tag">女巫</div>
                        <div v-if="game.knightAmount" class="tag">騎士</div>
                        <div v-if="game.hunterAmount" class="tag">獵人</div>
                    </span>
                </div>
                <div
                    class="game-row"
                    @click="werewolfDescriptionDialogVisible = true"
                >
                    <span class="game-row-name">
                        <h5>狼人</h5>
                    </span>
                    <span class="game-row-content"
                        >{{ game.werewolfAmount }} 位</span
                    >
                </div>
                <div
                    class="game-row"
                    @click="civilianDescriptionDialogVisible = true"
                >
                    <span class="game-row-name">
                        <h5>平民</h5>
                    </span>
                    <span class="game-row-content"
                        >{{ game.civilianAmount }} 位</span
                    >
                </div>
            </div>
        </ContentWrapper>

        <el-dialog
            v-if="isRoomManger"
            title="選擇座位"
            :visible.sync="seatSelectorDialogVisible"
            width="90%"
            center
        >
            <el-row
                type="flex"
                align="center"
                v-for="seat in seatEditor"
                :key="seat.seatIndex"
            >
                <el-col :span="8">
                    <span>座位 {{ seat.seatIndex }} :</span>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="seat.userId" placeholder="未選擇">
                        <el-option
                            v-for="user in users"
                            :key="user.id"
                            :label="user.firstName"
                            :value="user.id"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <Button
                    type="secondary"
                    :isDisabled="isUserDuplicatedInSeats"
                    @onClick="() => {
                        hideSeatEditor();
                        updateRoomSeats(this.seatEditor);
                    }"
                    >{{
                        isUserDuplicatedInSeats ? "玩家位置重複" : "確認座位"
                    }}</Button
                >
            </span>
        </el-dialog>

        <el-dialog
            title="狼人角色"
            :visible.sync="werewolfDescriptionDialogVisible"
            width="90%"
            center
        >
            <p>狼王：除被女巫毒殺以外，在出局時可以選擇一民玩家一起出局</p>
            <p>狼人：夜晚可以與其他狼隊友討論暗殺掉一名玩家</p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="werewolfDescriptionDialogVisible = false"
                    >知道了</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            title="神職角色"
            :visible.sync="godDescriptionDialogVisible"
            width="90%"
            center
        >
            <p>預言家：夜晚時可以查驗一名玩家身份，能知道此玩家是好人或壞人</p>
            <p>
                女巫：夜晚時可使用解藥或毒藥、兩瓶藥都只能使用一次，且不能在同個夜晚同時使用
            </p>
            <p>獵人：如果被狼人或白日投票出局，則可帶走一人</p>
            <p>
                騎士：白天時可以啟動技能驗證一名玩家身份，如是狼人則擊殺，如是好人則以死謝罪
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="godDescriptionDialogVisible = false"
                    >知道了</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            title="狼人角色"
            :visible.sync="werewolfDescriptionDialogVisible"
            width="90%"
            center
        >
            <p>狼王：除被女巫毒殺以外，在出局時可以選擇一民玩家一起出局</p>
            <p>狼人：夜晚可以與其他狼隊友討論暗殺掉一名玩家</p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="werewolfDescriptionDialogVisible = false"
                    >知道了</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            title="神職角色"
            :visible.sync="civilianDescriptionDialogVisible"
            width="90%"
            center
        >
            <p>人民：無任何技能</p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="civilianDescriptionDialogVisible = false"
                    >知道了</el-button
                >
            </span>
        </el-dialog>
    </section>
</template>

<script src="./Room.js"></script>

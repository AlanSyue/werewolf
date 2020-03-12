<template>
    <section id="room_create">
        <ContentWrapper
            theme="border"
            goBackBtnText="< 進入房間"
            :goBackBtnEvent="goBackPage"
            :actionBtnEvent="createRoom"
            :actionBtnText="`創建房間(${player_count}人局)`"
        >
            <p class="form-title">神職配置</p>
            <div class="form-arae">
                <el-checkbox-group v-model="activeGodRoles" size="mini">
                    <el-checkbox-button label="預言家" ></el-checkbox-button>
                    <el-checkbox-button label="女巫" ></el-checkbox-button>
                    <el-checkbox-button label="騎士" ></el-checkbox-button>
                    <el-checkbox-button label="獵人" ></el-checkbox-button>
                </el-checkbox-group>
            </div>
            <p class="form-title">狼人配置</p>
            <div class="form-arae">
                <el-row type="flex" class="form-row">
                    <el-col :span="8" type="flex">
                        <label for="werewolf-amount-input">普通狼人</label>
                    </el-col>
                    <el-col :span="16">
                        <el-input-number
                            id="werewolf-amount-input"
                            class="m-number-selector"
                            v-model="werewolfAmount"
                            :min="1"
                            :max="10"
                            size="mini"
                            label="普通狼人"
                        />
                    </el-col>
                </el-row>
                <el-row type="flex" class="form-row">
                    <el-col :span="8" type="flex">
                        <label for="snowwolf-amount-input">雪狼</label>
                    </el-col>
                    <el-col :span="16">
                        <el-input-number
                            id="snowwolf-amount-input"
                            class="m-number-selector"
                            v-model="snowwolfAmount"
                            :min="0"
                            :max="1"
                            size="mini"
                            label="雪狼"
                            :disabled="true"
                        />
                    </el-col>
                </el-row>
                <el-row type="flex" class="form-row">
                    <el-col :span="8" type="flex">
                        <label for="kingwolf-amount-input">狼王</label>
                    </el-col>
                    <el-col :span="16">
                        <el-input-number
                            id="kingwolf-amount-input"
                            class="m-number-selector"
                            v-model="kingwolfAmount"
                            :min="0"
                            :max="1"
                            size="mini"
                            label="狼王"
                            :disabled="true"
                        />
                    </el-col>
                </el-row>
            </div>
            <p class="form-title">平民配置</p>
            <div class="form-arae">
                <el-row type="flex" class="form-row">
                    <el-col :span="8" type="flex">
                        <label for="civilian-amount-input">平民人數</label>
                    </el-col>
                    <el-col :span="16">
                        <el-input-number
                            id="werewolf-amount-input"
                            class="m-number-selector"
                            v-model="civilianAmount"
                            :min="1"
                            :max="10"
                            size="mini"
                            label="平明人數"
                        />
                    </el-col>
                </el-row>
            </div>
            <p class="form-title">技能配置</p>
            <div class="form-arae">
                <el-row type="flex" class="form-row">
                    <label for="rule-witch-save-myself">解藥只有第一局可以自救</label>
                    <el-checkbox
                        class="end-radio-button"
                        id="rule-witch-save-myself"
                        :disabled="true"
                        v-model="ruleSetting.witchSaveSelf"
                    />
                </el-row>
                <el-row type="flex" class="form-row">
                    <label for="rule-witch-double-use-in-one-night">毒藥與解藥不能同局使用</label>
                    <el-checkbox
                        class="end-radio-button"
                        id="rule-witch-double-use-in-one-night"
                        :disabled="true"
                        v-model="ruleSetting.witchDoubleUseSkillInOneNight"
                    />
                </el-row>
            </div>
        </ContentWrapper>
    </section>
</template>

<script src="./RoomCreate.js"></script>

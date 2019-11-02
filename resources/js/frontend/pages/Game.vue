<template>
    <section id="game" :class="{'night-mode': isNightMode}">
        <el-button @click="playSound1" >天黑</el-button>
        <el-button @click="playSound2" >天亮</el-button>
        <el-button @click="playSound12" >天黑天亮</el-button>
        <el-footer class="bg-gray">
            <el-row type="flex">
                <el-col :span="8">
                    <el-button :loading="loading" @click="roleDialogVisible = true">查看角色</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button :loading="loading" @click="skillDialogVisible = true">使用技能</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button :loading="loading" @click="gameRecordDialogVisible = true">遊戲紀錄</el-button>
                </el-col>
            </el-row>
        </el-footer>

        <el-dialog
            title="你的角色是"
            :visible.sync="roleDialogVisible"
            width="90%"
            center>
            <h3>狼人</h3>
            <p>技能：夜晚可以與其他狼隊友討論暗殺掉一名玩家</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="roleDialogVisible = false">知道了</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="技能使用"
            :visible.sync="skillDialogVisible"
            width="90%"
            center>
            <h3>平民</h3>
            <p>你沒有技能</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="skillDialogVisible = false">關閉</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="遊戲過程"
            :visible.sync="gameRecordDialogVisible"
            width="90%"
            center>
            <p>第一夜晚結果：平安夜</p>
            <p>第一白天結果：1號驅逐 <el-button>查看票型</el-button></p>
            <p>第二夜晚結果：2號死亡</p>
            <p>第一白天結果：3號驅逐 <el-button>查看票型</el-button></p>
            <p>第二夜晚結果：4、5號死亡</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="gameRecordDialogVisible = false">關閉</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script src="./Game.js"></script>

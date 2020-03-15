<template>
    <section id="room-join">
        <el-row type="flex" class="form-content padding-top-base padding-top-base padding-bottom-base">
            <el-col :span="6" type="flex" justify="center" align="center" >
                <label for="pin_code">房間代號：</label>
            </el-col>
            <el-col :span="12"><el-input id="pin_code" v-model="pin_code" label="房間代號"></el-input></el-col>
        </el-row>
        <el-footer class="bg-gray">
            <el-row type="flex">
                <el-col :span="24">
                    <el-button type="success" @click="joinRoom">加入遊戲室</el-button>
                </el-col>
            </el-row>
        </el-footer>
    </section>
</template>

<script src="./RoomJoin.js"></script>

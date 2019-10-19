<template>
    <el-row id="home" type="flex" align="middle" justify="center">
        <div class="content">
            <el-col :span="24">
                <div class="square">
                    <div class="dummy"></div>
                </div>
            </el-col>
            <el-col :span="24">
                <router-link to="/rooms/create">
                    <el-button plain>創建房間</el-button>
                </router-link>
            </el-col>
            <el-col :span="24">
                <router-link to="/rooms/join">
                    <el-button plain>進入房間</el-button>
                </router-link>
            </el-col>
        </div>
    </el-row>
</template>
<script src="./Home.js"></script>

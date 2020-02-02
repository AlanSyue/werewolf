<template>
    <section id="home" class="align-items-center justify-center flex-direction-column">
        <el-row type="flex" align="middle" justify="center">
            <el-col :span="24" class="justify-center">
                <router-link to="/room/create">
                    <el-button type="info" plain>創建房間</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="center"> 
            <el-col :span="24" class="justify-center">
                <router-link to="/room/join">
                    <el-button type="info" plain>進入房間</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="center"> 
            <el-col :span="24" class="justify-center">
                <router-link to="/game">
                    <el-button type="info" plain>測試捷徑</el-button>
                </router-link>
            </el-col>
        </el-row>
    </section>
</template>
<script src="./Home.js"></script>

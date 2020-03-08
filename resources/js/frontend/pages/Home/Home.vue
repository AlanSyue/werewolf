
<template>
    <section id="home" class="align-items-center justify-center flex-direction-column">
        <el-row type="flex" align="middle" justify="center" class="justify-center">
            <router-link to="/room/create">
                <Button type="primary">創建房間</Button>
            </router-link>
        </el-row>
        <el-row type="flex" align="middle" justify="center" class="justify-center"> 
            <router-link to="/room/join">
                <Button type="secondary">進入房間</Button>
            </router-link>
        </el-row>
        <el-row type="flex" align="middle" justify="center" class="justify-center"> 
            <router-link to="/game">
                <Button type="secondary">測試捷徑</Button>
            </router-link>
        </el-row>
    </section>
</template>
<script src="./Home.js"></script>

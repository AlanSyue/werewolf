<template>
    <section id="room_create">
        <el-row type="flex">
            <el-col class="form-header" :span="6">
                <p>神明配置</p>
            </el-col>
        </el-row>
        <el-row type="flex" class="form-content bg-gray">
            <el-col :span="6" class="justify-center" ><el-checkbox-button v-model="prophet_active" label="預言家" border></el-checkbox-button></el-col>
            <el-col :span="6" class="justify-center" ><el-checkbox-button v-model="witch_active" label="女巫" border></el-checkbox-button></el-col>
            <el-col :span="6" class="justify-center" ><el-checkbox-button v-model="knight_active" label="騎士" border></el-checkbox-button></el-col>
            <el-col :span="6" class="justify-center" ><el-checkbox-button v-model="hunter_active" label="獵人" border></el-checkbox-button></el-col>
        </el-row>
        <el-row type="flex" class="form-header">
            <el-col :span="6">
                <p>狼人配置</p>
            </el-col>
        </el-row>
        <el-row type="flex" class="bg-gray padding-top-base padding-bottom-base">
            <el-col :span="6" class="justify-center"><el-checkbox-button v-model="kingwolf_active" label="狼王" border></el-checkbox-button></el-col>
            <el-col :span="18"></el-col>
        </el-row>
        <el-row type="flex" class="bg-gray padding-bottom-base">
            <el-col :span="6" type="flex" class="justify-center" >
                <label for="werewolf-amount-input">普通狼人</label>
            </el-col>
            <el-col :span="12"><el-input-number id="werewolf-amount-input" v-model="werewolf_amount" :min="1" :max="10" label="普通狼人"></el-input-number></el-col>
        </el-row>
        <el-row type="flex" class="form-content" align="center" >
            <el-col :span="6" type="flex" class="justify-center" >
                <label for="civilian-amount-input">平民人數</label>
            </el-col>
            <el-col :span="12"><el-input-number id="civilian-amount-input" v-model="civilian_amount" :min="1" :max="10" label="普通狼人"></el-input-number></el-col>
        </el-row>
        <el-footer class="bg-gray">
            <el-row type="flex">
                <el-col :span="12"></el-col>
                <el-col :span="8" type="flex" justify="center" align="center" >
                    <label>{{ player_count}} 人局</label>
                </el-col>
                <el-col :span="4"><el-button @click="createRoom">創建房間</el-button></el-col>
            </el-row>
        </el-footer>
    </section>
</template>

<script src="./RoomCreate.js"></script>

<template>
    <section id="login">
        <div class="content bg-gray">
            <el-row type="flex">
                <el-col :span="6" type="flex" class="justify-center" >
                    <span for="userName">暱稱：</span>
                </el-col>
                <el-col :span="18" class="align-item-center">
                    <el-input id="userName" v-model="userName" :min="1" :max="10" label="普通狼人"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" class="form-content" align="center" >
                <el-col :span="24">
                    <el-button :loading="loading" @click="createMember" type="primary">送出</el-button>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script src="./Login.js"></script>

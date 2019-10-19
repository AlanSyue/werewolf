<template>
    <el-page-header
        :class="{ noBackBtn: isHomePage }"
        @back="goBack"
        :content="$route.meta.title"
    ></el-page-header>
</template>

<script src="./PageHeader.js"></script>

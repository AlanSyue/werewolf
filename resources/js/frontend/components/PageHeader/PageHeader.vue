<template>
    <nav
        v-if="!hidden"
        :class="{ 'c-nav': true, noBackBtn: isHomePage }"
    >
        <button @click="goBack">ㄑ</button><span class="title">{{title}}</span>
    </nav>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-nav {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 56px;
    background-color: transparent;
    padding: 0 24px;
    display: flex;
    align-items: center;
    font-size: 12px;
    letter-spacing: 1.67px;
    color: rgba(252, 252, 253, 0.64);
    button{
        background-color: transparent;
        border: none;
        color: inherit;
        margin-right: 12px;
    }
    &.noBackBtn{
        button{
            visibility: hidden;
        }
    }
}
</style>

<script>
export default {
    name: "page-header",
    computed: {
        title: function(){
            try{
                return this.$route.meta.title;
            } catch {
                return 'title';
            }
        },
        isHomePage: function(){
            try{
                return this.$route.path == '/';
            } catch {
                return false;
            }
        },
        hidden: function(){
            try{
                return this.$route.meta.pageHeader.hidden;
            } catch {
                return false;
            }
        }
    },
    methods: {
        goBack() {
            try{
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push("/");
            } catch(e){
                console.error(e)
            }
        }
    }
};
</script>
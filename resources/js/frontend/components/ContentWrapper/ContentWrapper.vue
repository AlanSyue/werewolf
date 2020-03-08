<template>
    <div
        :class="['c-content-wrapper', 'theme-'+theme]"
    >
        <div class="inner-content">
            <slot></slot>
            <div class="action-area">
                <span @click="goBackBtnEvent">{{goBackBtnText}}</span>
                <Button type="secondary" size="small" @onClick="actionBtnEvent">{{actionBtnText}}</Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-content-wrapper {
    display: block;
    width: 100%;
    max-width: 310px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid $color-sub2;
    border-radius: 8px;
    padding: 16px 20px;
    background-color: #fff;
    > .inner-content {
        position: relative;
        min-height: 480px;
        padding-bottom: 32px;
        .action-area {
            position: absolute;
            width: 100%;
            height: 32px;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.39px;
                color: $color-gray1;
                cursor: pointer;
            }
        }
    }
    &.theme-border{
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: none;
        background-image: linear-gradient(
            329deg,
            $color-purple 0%,
            #ffffff 100%
        );
        > .inner-content {
            width: 100%;
            border: 2px solid $color-sub2;
            border-radius: 8px;
            background-color: #fff;
            padding: 18px 16px;
            .action-area{
                bottom: 18px;
                left: 16px;
                width: calc(100% - 32px);
            }
        }
    }
}
</style>

<script>
import Button from '../Button/Button.vue';
export default {
    name: "ContentWrapper",
    components: {
        Button
    },
    props: {
        theme: {
            // theme options => border
            type: String,
            default: ''
        },
        goBackBtnEvent: {
            type: Function,
            default: () => {
                try{
                    window.history.length > 1
                        ? this.$router.go(-1)
                        : this.$router.push("/");
                } catch(e){
                    console.error(e)
                }
            }
        },
        goBackBtnText: {
            type: String
        },
        actionBtnText: {
            type: String
        },
        actionBtnEvent: {
            type: Function,
            default: () => {}
        }
    }
};
</script>

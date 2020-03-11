<template>
    <div
        :class="['c-content-wrapper', 'theme-'+theme]"
    >
        <div class="inner-content">
            <slot></slot>
            <div class="action-area">
                <div class="left">
                    <span
                        v-if="showGoBackBtn"
                        @click="!goBackBtnDisabled && goBackBtnEvent()"
                    >
                        {{goBackBtnText}}
                    </span>
                </div>
                <div class="right">
                    <Button
                        type="secondary"
                        :isDisabled="actionDisabled"
                        size="small"
                        @onClick="actionBtnEvent"
                    >
                        {{actionBtnText}}
                    </Button>
                </div>
            </div>
        </div>
        <div v-if="showCoverView" class="cover-view">
            <span>{{coverViewText}}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-content-wrapper {
    position: relative;
    display: block;
    width: 100%;
    max-width: 310px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid $color-sub2;
    border-radius: 8px;
    padding: 16px 20px;
    background-color: #fff;
    .cover-view{
        position: absolute;
        width: 100%;
        bottom:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $color-sub1;
        min-height:52px;
    }
    > .inner-content {
        position: relative;
        padding-bottom: 48px;
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
            padding-bottom: 68px;
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
        showCoverView: {
            type: Boolean,
            default: false,
        },
        coverViewText: {
            type: String,
            default: '',
        },
        showGoBackBtn: {
            type: Boolean,
            default: true
        },
        goBackBtnDisabled: {
            type: Boolean,
            default: false
        },
        goBackBtnEvent: {
            type: Function,
            default: () => {}
        },
        goBackBtnText: {
            type: String
        },
        actionDisabled: {
            type: Boolean,
            default: false
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

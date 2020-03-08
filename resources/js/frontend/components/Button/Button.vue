<template>
    <button
        :class="['c-button', type, size]"
        :disabled="isDisabled"
        @click="$emit('onClick')"
    ><slot></slot></button>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-button {
    position: relative;
    box-shadow: 0 2px 6px 0 #9b9b9b;
    text-align: center;
    transition: 0.3s;
    line-height: 1;
    border-radius: 18px;
    cursor: pointer;
    &.medium{
        padding: 8px 24px;
        font-size: 16px;
        letter-spacing: 2.22px;
    }
    &.small{
        padding: 8px 20px;
        font-size: 14px;
        letter-spacing: 1.94px;

    }
    &.primary{
        background-color: #FFFFFF;
        color: $color-black;
        &:active{
            box-shadow: none;
        }
        &:disabled{
            box-shadow: none;
            opacity: 0.42;
            background-color: $color-main-dark;
            color: #FFF;
        }
    }
    &.secondary{
        background-color: $color-main-dark;
        color: #FFF;
        &.active{
            background-color: $color-main-light;
        }
        &:disabled{
            background-color: rgba(155, 155, 155, 0.6);
        }
    }
}
</style>

<script>
export default {
    name: "Button",
    props: {
        type: {
            //primary、secondary
            type: String,
            default: 'primary'
        },
        size: {
            //small、large
            type: String,
            default: 'small'
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function,
            default: () => {}
        }
    }
};
</script>

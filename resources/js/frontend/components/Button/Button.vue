<template>
    <button
        class="c-button"
        :disabled="isDisabled"
        @click="$emit('onClick')"
    ><slot></slot></button>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-button {
    position: relative;
    padding: 8px 24px;
    background-color: #FFFFFF;
    color: $color-black;
    border-radius: 18px;
    box-shadow: 0 2px 6px 0 #9b9b9b;
    text-align: center;
    font-size: 16px;
    letter-spacing: 2.22px;
    transition: 0.3s;
    cursor: pointer;
    &:active{
        box-shadow: none;
    }
    &:disabled{
        box-shadow: none;
        opacity: 0.42;
        background-color: $color-main-dark;
        color: #FFF;
    }
    &.sub{
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

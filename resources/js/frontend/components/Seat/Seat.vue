<template>
    <div :class="classObject">
        <div class="index">
            <p class="content">{{ number }}</p>
        </div>
        <div class="content">
            <p>{{ content }}</p>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

.c-seat {
    position: relative;
    width: 52px;
    display: flex;
    border-radius: 8px;
    @include pseudoPaddingHeight(100%);
    > .content {
        @include abs-center;
        width: calc(100% - 4px);
        font-size: 12px;
        overflow: hidden;
        > p {
            margin: 0;
            text-align: center;
        }
    }
    .index {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        width: 35%;
        border-radius: 50%;
        background-color: $color-main;
        @include pseudoPaddingHeight(100%);
        > .content {
            @include abs-center;
            font-size: 9px;
            text-align: center;
        }
    }

    &.theme-normal {
        border: 1px solid $color-main;
        background-color: transparent;
        color: $color-main;
        .index {
            color: white;
        }
        &.self {
            color: white;
            border-color: $color-main;
            background-color: $color-main;
            .index {
                border: 1px solid white;
                background-color: $color-main;
            }
        }

        &.active {
            border-color: $color-pass;
            .index {
                border: 1px solid white;
                background-color: $color-pass;
            }
        }

        &.active.self {
            background-color: $color-pass;
        }
    }

    &.theme-gameuser {
        opacity: 0.2;
        border: 2px solid $color-white;
        background-color: transparent;
        color: $color-white;
        .index {
            color: $color-main;
            background-color: $color-white;
        }
        
        &.self {
        }

        &.active {
            opacity: 1;
            .index {
                border: 1px solid $color-white;
                background-color: $color-white;
            }
        }

        &.active.self {
            background-color: $color-sub3;
        }
    }
}
</style>

<script>
export default {
    name: "Seat",
    props: {
        active: {
            type: Boolean,
            default: false
        },
        number: {
            type: Number,
            default: 0
        },
        content: {
            type: String,
            default: "default"
        },
        selfActive: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: "normal"
        }
    },
    computed: {
        classObject: function() {
            let obj = {
                "c-seat": true,
                active: Boolean(this.active),
                self: Boolean(this.selfActive)
            };
            obj[`theme-${this.theme}`] = true;
            return obj;
        }
    }
};
</script>

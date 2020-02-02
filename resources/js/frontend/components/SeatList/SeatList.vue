<template>
<ul class="c-seat-list">
    <li v-for="(seat, index) in seats" :key="index">
        <Seat :number="seat.number" :content="seat.content" :active="seat.active" :self-active="seat.selfActive" />
    </li>
</ul>
</template>

<style lang="scss">
@import "../../../../sass/_defines";
@import "../../../../sass/frontend/_variables";

ul.c-seat-list {
    @include flexable(row, flex-start, flex-start);
    flex-wrap: wrap;
    list-style: none;
    margin: 8px 0;
    width: 100%;
    li {
        width: calc(25% - 15px);
        margin: 8px 0px;
        margin-right: 20px;
        &:nth-child(4),
        &:nth-child(8),
        &:nth-child(12) {
            margin-right: 0px;
        }
        .c-seat {
            width: 100%;
        }
    }
}
</style>

<script>
import Seat from "../Seat/Seat";
export default {
    name: "SeatList",
    props: {
        seats: {
            type: Array,
            default: []
        }
    },
    components: {
        Seat
    },
    computed: {
        classObject: function () {
            return {};
        }
    }
};
</script>

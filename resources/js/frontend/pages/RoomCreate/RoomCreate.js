export default {
    data: function() {
        return {
            prophet_active: false,
            witch_active: false,
            knight_active: false,
            hunter_active: false,
            kingwolf_active: false,
            civilian_amount: 1,
            werewolf_amount: 1
        };
    },
    computed: {
        game() {
            return this.$store.state.game;
        },
        auth() {
            return this.$store.state.auth;
        },
        player_count() {
            let count = this.civilian_amount + this.werewolf_amount;
            if (this.prophet_active) {
                count++;
            }
            if (this.witch_active) {
                count++;
            }
            if (this.knight_active) {
                count++;
            }
            if (this.hunter_active) {
                count++;
            }
            if (this.kingwolf_active) {
                count++;
            }
            return count;
        }
    },
    watch: {},
    created() {
        this.$store.dispatch("fetchAuth");
    },
    mounted() {},
    methods: {
        createRoom(){
            let room_data = {
                civilian_amount: this.civilian_amount,
                werewolf_amount: this.werewolf_amount,
                prophet_amount: this.prophet_active,
                witch_amount: this.witch_active,
                knight_amount: this.knight_active,
                hunter_amount: this.hunter_active,
                kingwolf_amount: this.kingwolf_active
            };
            this.loading = true;
            this.$store
                .dispatch("createRoom", room_data)
                .then(() => this.$router.push("/room"))
        }
    }
};

import Button from "../../components/Button/Button.vue";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper.vue";

export default {
    name: "RoomCreate",
    components: {
        Button,
        ContentWrapper
    },
    data: function() {
        return {
            activeGodRoles: [],
            kingwolf_active: 0,
            snowwolf_active: 0,
            civilian_amount: 1,
            werewolf_amount: 1,
            rule_witch_save_myself: false,
            rule_witch_double_use_in_one_night: false
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
            let count =
                this.civilian_amount +
                this.werewolf_amount +
                this.activeGodRoles.length;
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
        goBackPage() {
            try {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push("/");
            } catch (e) {
                console.error(e);
            }
        },
        createRoom() {
            let room_data = {
                civilian_amount: this.civilian_amount,
                werewolf_amount: this.werewolf_amount,
                prophet_amount: this.activeGodRoles.includes("預言家"),
                witch_amount: this.activeGodRoles.includes("女巫"),
                knight_amount: this.activeGodRoles.includes("騎士"),
                hunter_amount: this.activeGodRoles.includes("獵人"),
                kingwolf_amount: this.kingwolf_active
            };
            this.loading = true;
            this.$store
                .dispatch("createRoom", room_data)
                .then(() => this.$router.push("/room"));
        }
    }
};

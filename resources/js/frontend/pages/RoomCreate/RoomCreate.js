import Button from "Button/Button.vue";
import ContentWrapper from "ContentWrapper/ContentWrapper.vue";

export default {
    name: "RoomCreate",
    components: {
        Button,
        ContentWrapper
    },
    data: function() {
        return {
            activeGodRoles: [],
            kingwolfAmount: 0,
            snowwolfAmount: 0,
            civilianAmount: 1,
            werewolfAmount: 1,
            ruleSetting: {
                witchSaveSelf: false,
                witchDoubleUseSkillInOneNight: false
            }
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
            return this.civilianAmount +
                this.werewolfAmount +
                this.kingwolfAmount +
                this.snowwolfAmount +
                this.activeGodRoles.length;
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
                this.$router.push("/")
            } catch (e) {
                console.error(e);
            }
        },
        createRoom() {
            let roomData = {
                civilianAmount: this.civilianAmount,
                werewolfAmount: this.werewolfAmount,
                prophetAmount: this.activeGodRoles.includes("預言家"),
                witchAmount: this.activeGodRoles.includes("女巫"),
                knightAmount: this.activeGodRoles.includes("騎士"),
                hunterAmount: this.activeGodRoles.includes("獵人"),
                kingwolfAmount: this.kingwolfAmount
            };
            this.loading = true;
            this.$store
                .dispatch("createRoom", roomData)
                .then(() => this.$router.push("/room"));
        }
    }
};

export default {
    data: function() {
        return {};
    },
    computed: {
        game() {
            return this.$store.state.game;
        },
        auth() {
            return this.$store.state.auth;
        }
    },
    watch: {},
    created() {
        this.$store.dispatch("fetchAuth");
        this.$store.dispatch("fetchGameData");
    },
    mounted() {},
    methods: {
    }
};

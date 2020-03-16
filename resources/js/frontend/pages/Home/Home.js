import Button from 'Button/Button.vue'

export default {
    data: function() {
        return {};
    },
    components: {
        Button
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
    methods: {
        fetchAuth() {
            this.$store.dispatch("fetchAuth");
        },
    }
};

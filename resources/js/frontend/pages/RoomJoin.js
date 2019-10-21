export default {
    data: function() {
        return {
            pin_code: ""
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        joinRoom() {
            let self = this;
            this.$store
                .dispatch("joinRoom", self.pin_code)
                .then(() =>
                    this.$router.push({
                        path: "/room",
                        params: self.pin_code
                    })
                )
                .catch(e => {
                    console.debug(e);
                    this.pin_code = "";
                });
        }
    }
};

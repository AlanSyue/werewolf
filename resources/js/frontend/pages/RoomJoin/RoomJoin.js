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
            let sss = this.$store
                .dispatch("joinRoom", self.pin_code)
                .then(res => {
                    this.$router.push({
                        path: "/room",
                        params: self.pin_code
                    });
                })
                .catch(e => {
                    console.error(e);
                    this.$message({
                        message: "加入房間錯誤！",
                        type: "warning"
                    });
                    this.pin_code = "";
                });
        }
    }
};

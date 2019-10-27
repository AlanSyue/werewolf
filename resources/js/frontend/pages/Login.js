export default {
    data: function() {
        return {
            loading: false,
            userName: ""
        };
    },
    computed: {
        auth() {
            return this.$store.state.auth;
        }
    },
    watch: {},
    created() {
        this.$store.dispatch("fetchAuth");
    },
    methods: {
        fetchAuth() {
            this.$store.dispatch("fetchAuth");
        },
        createMember() {
            this.loading = true;
            axios
                .post("/register", {
                    first_name: this.userName
                })
                .then(res => {
                    if(res.status == 200){
                        this.$router.push("/")
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};

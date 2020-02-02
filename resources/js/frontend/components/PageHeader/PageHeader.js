

export default {
    name: "page-header",
    data: function() {
        return {};
    },
    computed: {
        isHomePage: function(){
            return this.$route.path == '/';
        }
    },
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push("/");
        }
    }
};

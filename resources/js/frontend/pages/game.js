export default {
    data: function() {
        return {};
    },
    computed: {
        data() {
            return this.$store.state.room;
        }
    },
    created() {
        this.$store.dispatch("fetchRoom");
    },
    mounted() {
    },
    method: {
        getUserName(id) {
            return this.users.filter(function(user) {
                $user.id == id;
            })[0];
        },
        fetchRoom(roomId) {
            this.$store.dispatch("fetchRoom", roomId);
        }
    }
};



export default {
    data: function() {
        return {};
    },
    computed: {
        room: function() {
            return this.$store.state.gameData.room;
        },
        game() {
            return this.$store.state.gameData.game;
        },
        roomUsers() {
            return this.$store.state.gameData.users;
        },
        roomSeats() {
            return this.$store.state.gameData.seats;
        },
        auth() {
            return this.$store.state.auth;
        }
    },
    watch: {
        room: function() {
            let roomId = this.room.id;
            if (roomId != 0) {
                this.handleEventService(roomId);
            }
        }
    },
    created() {
        this.$store.dispatch("fetchAuth");
        this.$store.dispatch("fetchGameData");
    },
    mounted() {},
    methods: {
        getUserName(id) {
            return this.users.filter(function(user) {
                $user.id == id;
            })[0];
        },
        fetchGameData() {
            this.$store.dispatch("fetchGameData");
        },
        fetchAuth() {
            this.$store.dispatch("fetchAuth");
        },
        handleEventService: function joinedRoom(roomId) {
            window.Echo.join(`room.${roomId}`)
                .here(users => {
                    this.$store.state.gameData.users =  users;
                })
                .joining(user => {
                    this.$store.state.gameData.users.push(user);
                })
                .leaving(user => {
                    this.$store.state.gameData.users = this.$store.state.gameData.users.filter(
                        function(originUser) {
                            return originUser.id != user.id;
                        }
                    );
                });
        }
    }
};

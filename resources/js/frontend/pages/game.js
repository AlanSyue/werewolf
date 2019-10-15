

export default {
    data: function() {
        return {};
    },
    computed: {
        room: function() {
            return this.$store.state.room;
        },
        game() {
            return this.$store.state.game;
        },
        roomUsers() {
            return this.$store.state.users;
        },
        roomSeats() {
            return this.$store.state.seats;
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
        updateRoomSeats() {
            this.$store.dispatch("updateRoomSeats", this.roomSeats);
        },
        startGame(){
            axios
                .post("/game/start")
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleEventService: function joinedRoom(roomId) {
            window.Echo.join(`room.${roomId}`)
                .here(users => {
                    this.$store.state.users = users;
                })
                .joining(user => {
                    this.$store.state.users.push(user);
                })
                .leaving(user => {
                    this.$store.state.users = this.$store.state.users.filter(
                        function(originUser) {
                            return originUser.id != user.id;
                        }
                    );
                })
                .listen("Frontend\\GameUserUpdated", e => {
                    let data = e.gameUsers;
                    let seats = data.map(function(gameUser) {
                        return {
                            id: gameUser.seat_index,
                            user_id: gameUser.user_id
                        };
                    });
                    this.$store.state.seats = seats;
                    this.$store.state.gameUsers = data;
                })
                .listen("Frontend\\GameStarted", e => {
                    this.$alert("開始遊戲囉", {
                        confirmButtonText: "確認"
                    });
                });
        }
    }
};

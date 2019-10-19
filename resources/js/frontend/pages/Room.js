

export default {
    name: 'Game',
    data: function() {
        return {
            isSavedGameUsers: false
        };
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
        gameUsers() {
            return this.$store.state.gameUsers;
        },
        auth() {
            return this.$store.state.auth;
        },
        isUserDuplicatedInSeats() {
            let gameUsers = this.gameUsers;
            let isConatinsUnSelectedSeat = gameUsers.filter(function(user){
                return !(user.user_id);
            }).length > 0;
            if(isConatinsUnSelectedSeat){
                return true;
            }
            let seatCount = gameUsers.length;
            let seatUserIds = _.map(gameUsers, user => user.user_id);
            let seatUniqueUserCount = _.uniq(seatUserIds).length;
            return !(seatCount == seatUniqueUserCount);
        },
        isValidSeatSetting(){
            return !this.isUserDuplicatedInSeats && this.isSavedGameUsers;
        },
        roomUserObject() {
            let object = {};
            _.forEach(this.roomUsers, function(user, key){
                object[user.id] = user;
            })
            return object;
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
        fetchGameData() {
            this.$store.dispatch("fetchGameData");
        },
        fetchAuth() {
            this.$store.dispatch("fetchAuth");
        },
        updateRoomSeats() {
            this.isSavedGameUsers = true;
            this.$store.dispatch("updateRoomSeats", this.gameUsers);
        },
        changeSeat() {
            this.isSavedGameUsers = false;
        },
        startGame() {
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

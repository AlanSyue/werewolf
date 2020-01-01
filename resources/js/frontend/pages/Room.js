

export default {
    name: "Room",
    data: function() {
        return {
            loading: false,
            isSavedGameUsers: false,
            seatSelectorDialogVisible: false,
            godDescriptionDialogVisible: false,
            werewolfDescriptionDialogVisible: false,
            civilianDescriptionDialogVisible: false
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
        readyUsers() {
            return this.$store.state.readyUsers;
        },
        isUserDuplicatedInSeats() {
            let gameUsers = this.gameUsers;
            let isConatinsUnSelectedSeat =
                gameUsers.filter(function(user) {
                    return !user.user_id;
                }).length > 0;
            if (isConatinsUnSelectedSeat) {
                return true;
            }
            let seatCount = gameUsers.length;
            let seatUserIds = _.map(gameUsers, user => user.user_id);
            let seatUniqueUserCount = _.uniq(seatUserIds).length;
            return !(seatCount == seatUniqueUserCount);
        },
        isUserAllReady() {
            let readyUsers = this.readyUsers;
            let roomUsers = this.roomUsers;
            let isDisabled = true;
            const allRoomUserIds = Object.values(roomUsers).map(user => user.id);
            // check if all ready user num equal room user num
            if ( allRoomUserIds.length == ( Object.keys(readyUsers).length + 1) ) {
                // check if all ready user status equal '1'
                if ( Object.values(readyUsers).every( (val, i, arr) => val === '1') ) {
                    isDisabled = false;
                }          
            }

            return isDisabled;
        },
        isAbleStartGame() {
            return (this.isUserDuplicatedInSeats || !this.isSavedGameUsers) || this.isUserAllReady;
        },
        isSeatReady() {
            let readyUsers = this.readyUsers;
            let isDisabled = true;
            Object.keys(readyUsers).map((key, index) => {
                if (key) {
                    isDisabled = false;
                }
            })
            return isDisabled;
        },
        roomUserObject() {
            let object = {};
            _.forEach(this.roomUsers, function(user, key) {
                object[user.id] = user;
            });
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
        readyGame() {
            this.loading = true;
            axios
                .post("/game/ready")
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        startGame() {
            this.loading = true;
            axios
                .post("/game/start")
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleEventService: function joinedRoom(roomId) {
            window.Echo.join(`room.${roomId}`)
                .here(users => {
                    this.$store.state.users = users;
                })
                .joining(newUser => {
                    let users = this.$store.state.users.filter(function(
                        originUser
                    ) {
                        return originUser.id != newUser.id;
                    });
                    users.push(newUser);
                    this.$store.state.users = users;
                })
                .leaving(user => {
                    this.$store.state.users = this.$store.state.users.filter(
                        function(originUser) {
                            return originUser.id != user.id;
                        }
                    );
                })
                .listen("Frontend\\GameUserUpdated", e => {
                    console.log(e);
                    let data = e.gameUsers;
                    let seats = data.map(function(gameUser) {
                        return {
                            id: gameUser.seat_index,
                            user_id: gameUser.user_id,
                            is_live: gameUser.is_live,
                            role_type: gameUser.role_type,
                            skill_use_status: gameUser.skill_use_status
                        };
                    });
                    let readyUsers = e.readyUsers;
                    this.$store.state.seats = seats;
                    this.$store.state.gameUsers = data;
                    this.$store.state.readyUsers = readyUsers;
                })
                .listen("Frontend\\RoomUserReady", e => {
                    console.log(e);
                    let data = e.roomUsers;
                    let readyUsers = e.readyUsers;
                    this.$store.state.roomUsers = data;
                    this.$store.state.readyUsers = readyUsers;
                })
                .listen("Frontend\\GameStarted", e => {
                    this.$router.push({
                        path: "/game"
                    });
                });
        }
    }
};

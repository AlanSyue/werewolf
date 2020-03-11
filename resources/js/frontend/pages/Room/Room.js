import Button from "../../components/Button/Button.vue";
import SeatList from "../../components/SeatList/SeatList.vue";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper.vue";

export default {
    name: "Room",
    components: {
        Button,
        ContentWrapper,
        SeatList
    },
    data: function() {
        return {
            loading: false,
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
        isSettledSeats() {
            return this.gameUsers && this.gameUsers[0] && this.gameUsers[0]['user_id']
        },
        isRoomMayor() {
            return this.room.mayor_user_id == this.auth.id
        },
        roomMayorWrapperConfig(){
            if(this.isSettledSeats){
                var actionBtnConfig = {
                    actionBtnText: '開始遊戲',
                    actionBtnEvent: this.toGameView
                }
            }else{
                var actionBtnConfig = {
                    actionBtnText: '選擇座位',
                    actionBtnEvent: this.showSeatEditor
                }
            };
            return {
                showCoverView: false,
                coverViewText: '',
                ...actionBtnConfig            }
        },
        roommateWapperConfig() {
            return {
                showCoverView: true,
                coverViewText: this.isSettledSeats? '等待其他玩家確認 …' : '等待室長選擇位置 …',
                actionBtnText: '',
                actionBtnEvent: () => {}
            }
        },
        wapperConfig(){
            return this.isRoomMayor? this.roomMayorWrapperConfig : this.roommateWapperConfig
        },
        seats() {
            const { auth, gameUsers, users } = this.$store.state;
            let userObject = {};
            _.forEach(users, function(user) {
                userObject[user.id] = user;
            });

            return gameUsers.map((gameUser, index) => {
                let content = "未選擇";
                let selfActive = false;
                if (gameUser.user_id) {
                    content = userObject[gameUser.user_id].first_name;
                    selfActive = gameUser.user_id == auth.id;
                }
                return {
                    number: index + 1,
                    content: content,
                    active: false,
                    selfActive: selfActive
                };
            });
        },
        gameUsers() {
            return this.$store.state.gameUsers;
        },
        auth() {
            return this.$store.state.auth;
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
        fetchAuth() {
            this.$store.dispatch("fetchAuth");
        },
        fetchGameData() {
            this.$store.dispatch("fetchGameData");
        },
        updateRoomSeats() {
            this.$store.dispatch("updateRoomSeats", this.gameUsers);
        },
        showSeatEditor(){
            this.seatSelectorDialogVisible = true
        },
        goToHome() {
            this.$router.push('/');
        },
        toGameView() {
            this.loading = true;
            axios
                .post("/room/toGameView")
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
                    this.$store.state.seats = seats;
                    this.$store.state.gameUsers = data;
                })
                .listen("Frontend\\ToGameView", e => {
                    this.$router.push({
                        path: "/game"
                    });
                });
        }
    }
};

import { mapActions, mapMutations, mapState } from 'vuex';

import Button from 'Button/Button.vue';
import SeatList from 'SeatList/SeatList.vue';
import ContentWrapper from 'ContentWrapper/ContentWrapper.vue';

export default {
    name: 'Room',
    components: {
        Button,
        ContentWrapper,
        SeatList
    },
    data: function() {
        return {
            seatEditor: [],
            loading: false,
            seatSelectorDialogVisible: false,
            godDescriptionDialogVisible: false,
            werewolfDescriptionDialogVisible: false,
            civilianDescriptionDialogVisible: false
        };
    },
    computed: {
        ...mapState(['auth', 'room', 'game', 'users', 'gameUsers', 'readyUsers', 'userMap']),
        isSettledSeats() {
            let { gameUsers } = this.$store.state;
            return gameUsers && gameUsers[0] && gameUsers[0]['userId'];
        },
        isRoomManger() {
            const { auth, room } = this.$store.state;
            return room.managerUserId == auth.id;
        },
        roomMangerWrapperConfig() {
            if (this.isSettledSeats) {
                var actionBtnConfig = {
                    actionBtnText: '開始遊戲',
                    actionDisabled: this.loading || !this.isAbleStartGame,
                    actionBtnEvent: this.toGameView
                };
            } else {
                var actionBtnConfig = {
                    actionBtnText: '選擇座位',
                    actionDisabled: false,
                    actionBtnEvent: this.showSeatEditor
                };
            }
            return {
                showGoBackBtn: !!this.isSettledSeats,
                goBackBtnText: '重選座位',
                goBackBtnEvent: () => {
                    this.showSeatEditor();
                },
                showCoverView: false,
                coverViewText: '',
                ...actionBtnConfig
            };
        },
        roomUserWapperConfig() {
            return {
                showGoBackBtn: false,
                goBackBtnText: '',
                goBackBtnEvent: () => {},
                showCoverView: (!this.isSettledSeats || this.isSeatReady),
                coverViewText:
                    (this.isSettledSeats && this.isSeatReady)
                        ? '等待其他玩家確認 …'
                        : '等待室長選擇位置 …',
                actionBtnText: '確認',
                actionDisabled: this.loading || this.isSeatReady,
                actionBtnEvent: () => {this.readyGame()}
            };
        },
        wapperConfig() {
            return this.isRoomManger
                ? this.roomMangerWrapperConfig
                : this.roomUserWapperConfig;
        },
        seats() {
            return this.gameUsers.map(gameUser => {
                let content = '未選擇';
                let selfActive = false;
                if (!!gameUser.userId) {
                    content = '離線'
                    if (this.userMap[gameUser.userId]) {
                        content = this.userMap[gameUser.userId].firstName;
                    }
                    selfActive = gameUser.userId == this.auth.id;
                }
                return {
                    number: gameUser.seatIndex,
                    content: content,
                    active: false,
                    selfActive: selfActive
                };
            });
        },
        isUserDuplicatedInSeats() {
            let seatEditor = this.seatEditor;
            let isNoAllSelected =
                seatEditor.filter(function(user) {
                    return !user.userId;
                }).length > 0;
            if (isNoAllSelected) {
                return true;
            }
            let seatCount = seatEditor.length;
            let seatUserIds = _.map(seatEditor, user => user.userId);
            let seatUniqueUserCount = _.uniq(seatUserIds).length;
            return !(seatCount == seatUniqueUserCount);
        },
        isAbleStartGame() {
            return this.isUserAllReady;
        },
        isUserAllReady() {
            let readyUsers = this.readyUsers;
            let isReady = false;
            if(Object.keys(readyUsers) == 0){
                return false;
            }
            // check if all ready user status equal '1'
            if (Object.values(readyUsers).every((val, i, arr) => val === '1')) {
                isReady = true;
            }
            return isReady;
        },
        isSeatReady() {
            let readyUsers = this.readyUsers;
            let isReady = false;
            Object.keys(readyUsers).map((key) => {
                if (key == this.auth.id && readyUsers[key] == '1') {
                    isReady = true;
                }
            });
            return isReady;
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
        this.fetchAuth();
        this.fetchGameData();
    },
    mounted() {},
    methods: {
        ...mapMutations([
            'FETCH_ROOM_USERS',
            'UPDATE_ROOM_USERS',
            'UPDATE_GAME_USERS'
        ]),
        ...mapActions([
            'fetchAuth',
            'fetchGameData',
            'updateRoomSeats',
            'handleUserJoined',
            'handleUserLeaving'
        ]),
        showSeatEditor() {
            const { gameUsers } = this.$store.state;
            this.seatEditor = gameUsers.map(gameUser => {
                return {
                    userId: gameUser.userId,
                    index: gameUser.seatIndex
                };
            });
            this.seatSelectorDialogVisible = true;
        },
        hideSeatEditor() {
            this.seatSelectorDialogVisible = false;
        },
        goToHome() {
            this.$router.push('/');
        },
        readyGame() {
            this.loading = true;
            axios
                .post('/game/ready')
                .then(res => {
                    console.log(res);
                    this.loading = false;

                })
                .catch(err => {
                    console.log(err);
                })
        },
        toGameView() {
            this.loading = true;
            axios
                .post('/room/toGameView')
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
                .here(this.FETCH_ROOM_USERS)
                .joining(this.handleUserJoined)
                .leaving(this.handleUserLeaving)
                .listen('Frontend\\GameUserUpdated', e => {
                    this.UPDATE_GAME_USERS(e.gameUsers);
                })
                .listen('Frontend\\RoomUserReady', e => {
                    console.log(e);
                    let readyUsers = e.readyUsers;
                    this.$store.state.readyUsers = readyUsers;
                })
                .listen('Frontend\\ToGameView', e => {
                    this.$router.push({
                        path: '/game'
                    });
                });
        }
    }
};

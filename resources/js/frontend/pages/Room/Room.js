import { mapMutations, mapState } from 'vuex';

import Button from '../../components/Button/Button.vue';
import SeatList from '../../components/SeatList/SeatList.vue';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper.vue';

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
        ...mapState(['room', 'game', 'users', 'gameUsers']),
        isSettledSeats() {
            let { gameUsers } = this.$store.state;
            return gameUsers && gameUsers[0] && gameUsers[0]['userId'];
        },
        isRoomManger() {
            const { auth } = this.$store.state;
            const { room } = this.$store.state;
            return room.mangerUserId == auth.id;
        },
        roomMangerWrapperConfig() {
            if (this.isSettledSeats) {
                var actionBtnConfig = {
                    actionBtnText: '開始遊戲',
                    actionBtnEvent: this.toGameView
                };
            } else {
                var actionBtnConfig = {
                    actionBtnText: '選擇座位',
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
                showCoverView: true,
                coverViewText: this.isSettledSeats
                    ? '等待其他玩家確認 …'
                    : '等待室長選擇位置 …',
                actionBtnText: '',
                actionBtnEvent: () => {}
            };
        },
        wapperConfig() {
            return this.isRoomManger
                ? this.roomMangerWrapperConfig
                : this.roomUserWapperConfig;
        },
        seats() {
            const { auth, gameUsers, userMap } = this.$store.state;
            return gameUsers.map(gameUser => {
                let content = '未選擇';
                let selfActive = false;
                if (!!gameUser.userId) {
                    content = userMap[gameUser.userId].firstName;
                    selfActive = gameUser.userId == auth.id;
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
        this.$store.dispatch('fetchAuth');
        this.$store.dispatch('fetchGameData');
    },
    mounted() {},
    methods: {
        ...mapMutations([
            'FETCH_ROOM_USERS',
            'UPDATE_ROOM_USERS',
            'UPDATE_GAME_USERS'
        ]),
        fetchAuth() {
            this.$store.dispatch('fetchAuth');
        },
        fetchGameData() {
            this.$store.dispatch('fetchGameData');
        },
        updateRoomSeats() {
            this.$store.dispatch('updateRoomSeats', this.seatEditor);
        },
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
                .here(users => {
                    this.FETCH_ROOM_USERS(users);
                })
                .joining(newUser => {
                    let newUsers = this.$store.state.users.filter(function(
                        originUser
                    ) {
                        return originUser.id != newUser.id;
                    });
                    newUsers.push({
                        id: newUser.id,
                        firstName: newUser.first_name,
                        fullName: newUser.full_name
                    });
                    this.UPDATE_ROOM_USERS(users);
                })
                .leaving(user => {
                    let newUsers = his.$store.state.users.filter(function(
                        originUser
                    ) {
                        return originUser.id != user.id;
                    });
                    this.FETCH_ROOM_USERS(newUsers);
                })
                .listen('Frontend\\GameUserUpdated', e => {
                    let gameUsers = e.gameUsers;
                    this.UPDATE_GAME_USERS(gameUsers);
                })
                .listen('Frontend\\ToGameView', e => {
                    this.$router.push({
                        path: '/game'
                    });
                });
        }
    }
};

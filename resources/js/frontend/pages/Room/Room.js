import { mapActions, mapMutations, mapState } from 'vuex';

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
            return room.managerUserId == auth.id;
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
                    if(userMap[gameUser.userId]){
                        content = userMap[gameUser.userId].firstName;
                    }
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
                .listen('Frontend\\ToGameView', e => {
                    this.$router.push({
                        path: '/game'
                    });
                });
        }
    }
};

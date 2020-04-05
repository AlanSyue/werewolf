import soundMechine from "../module/soundMechine";
import GameUser from "../module/GameUser";
import { mapState, mapActions, mapMutations } from "vuex";
import Button from "Button/Button.vue";
import SeatList from "SeatList/SeatList.vue";

export default {
    name: "Game",
    components: {
        Button,
        SeatList
    },
    data: function () {
        return {
            loading: false,
            roleDialogVisible: false,
            werewolfSkillDialogVisible: false,
            prophetSkillDialogVisible: false,
            knightSkillDialogVisible: false,
            werewolfKillUserId: null,
            isScanedTonight: false,
            voteUserId: null,
            scanUserId: null,
            scanResultBackupUserIds: [], // 在預言家查驗時先呈現給使用者看，不必再等 game_log 更新，但寫法需要再思考
            gameRecordDialogVisible: false,
            knightKillUserId: null
        };
    },
    computed: {
        ...mapState(["auth", "room", "game", "auth", "userMap", "gameLogs"]),
        voteDialogVisible() {
            if (!this.game) {
                return false;
            }
            return this.game.stage === 'vote';
        },
        isShowVoteResult() {
            if (!this.GameUsers) {
                return false;
            }
            const liveUserCount = this.GameUsers.filter(user => user.isLive).length;
            const votedUserCount = this.GameUsers.filter(user => user.isVoted).length;
            return liveUserCount == votedUserCount;
        },
        isWaitingVoteResult() {
            if (!this.Me) {
                return false;
            }
            return !this.Me.isLive || this.Me.isVoted;
        },
        voteResult() {
            if (!this.GameUsers || !this.game || !this.gameLogs) {
                return null;
            }
            let voteGroupBy = this.gameLogs.filter(log => {
                return log.skill === 'vote' && log.day === this.game.day;
            }).reduce((voteGroupBy, log) => {
                let voteTo = log.targetUserId;
                let voteFrom = log.userId;
                if (!voteGroupBy.hasOwnProperty(voteTo)) {
                    voteGroupBy[voteTo] = [];
                }
                voteGroupBy[voteTo] = [...voteGroupBy[voteTo], voteFrom];
                return voteGroupBy;
            }, {})

            return voteGroupBy;
        },
        isAvailableToStartGame() {
            if (!this.game || !this.Me) {
                return false;
            }
            return this.game.stage === 'idle' && this.Me.isRoomManager;
        },
        isAvailableToTriggerVote() {
            if (!this.game || !this.Me) {
                return false;
            }
            return this.game.stage === 'morning' && this.Me.isRoomManager;
        },
        prophetScanedUserIds() {
            let logs = this.gameLogs;
            if (!Boolean(logs)) {
                return [];
            }
            return logs
                .filter(row => row.skill === "prophet")
                .map(row => row.target_user_id);
        },
        GameUsers() {
            let gameUsers = this.$store.state.gameUsers;
            let game = this.$store.state.game;
            let room = this.$store.state.room;
            let gameLogs = this.$store.state.gameLogs;
            return gameUsers.map(gameUser => {
                return new GameUser({
                    gameUser: gameUser,
                    game: game,
                    room: room,
                    gameLogs: gameLogs
                });
            });
        },
        GameUserMap() {
            if (!Boolean(this.GameUsers)) {
                return null;
            }
            let object = {};
            _.forEach(this.GameUsers, function (user) {
                object[user.userId] = user;
            });
            return object;
        },
        Me() {
            let defaultMe = {
                isRoomManager: false
            };
            if (!Boolean(this.GameUserMap) || !this.auth) {
                return defaultMe;
            }
            return this.GameUserMap[this.auth.id] || defaultMe;
        },
        seats() {
            return this.GameUsers.map(GameUser => {
                let content = "死亡";
                if (!this.userMap[GameUser.userId]) {
                    content = "離線";
                } else if (GameUser.isLive) {
                    content = this.userMap[GameUser.userId].firstName;
                }
                return {
                    number: GameUser.seatIndex,
                    content: content,
                    active: !!GameUser.isLive,
                    selfActive: GameUser.userId == this.auth.id
                };
            });
        }
    },
    created() {
        let self = this;
        this.fetchAuth();
        this.fetchGameData().then(function () {
            self.handleEventService(self.room.id);
        });
    },
    mounted() { },
    methods: {
        ...mapMutations({
            FETCH_ROOM_USERS: "FETCH_ROOM_USERS",
            updateGame: "FETCH_GAME",
            updateGameUsers: "UPDATE_GAME_USERS",
            updateGameLogs: "FETCH_GAME_LOGS"
        }),
        ...mapActions([
            "fetchAuth",
            "fetchGameData",
            "handleUserJoined",
            "handleUserLeaving"
        ]),
        backToHome() {
            this.$router.push("/");
        },
        showSkillDialog() {
            if (!Boolean(this.Me)) {
                this.$message({
                    message: "伺服器忙碌中",
                    type: "warning"
                });
            }
            if (this.Me.isCivilian || this.Me.isSkillAllowed == false) {
                this.$message({
                    message: "沒有技能可使用哦",
                    type: "warning"
                });
            } else if (this.Me.isWereworlf) {
                this.werewolfSkillDialogVisible = true;
            } else if (this.Me.isProphet) {
                this.prophetSkillDialogVisible = true;
            } else if (this.Me.isKnight) {
                this.knightSkillDialogVisible = true;
            } else {
                this.$message({
                    message: "沒有技能可使用哦!",
                    type: "warning"
                });
            }
        },
        startGame() {
            this.loading = true;
            axios
                .post("/game/start", {
                    gameId: this.game.id
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        showAllUserVoteModel() {
            this.loading = true;
            axios
                .post("/game/vote/show", {
                    gameId: this.game.id
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        useWerewolfSkill() {
            if (!Boolean(this.werewolfKillUserId)) {
                this.$message({
                    message: "請先選擇殺人對象",
                    type: "warning"
                });
            }
            this.loading = true;
            axios
                .post("/game/skill/werewolf", {
                    gameId: this.game.id,
                    targetUserId: this.werewolfKillUserId
                })
                .then(res => {
                    console.log(res);
                    this.werewolfSkillDialogVisible = false;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        useProphetSkill() {
            if (!Boolean(this.scanUserId)) {
                this.$message({
                    message: "請先選擇查驗對象",
                    type: "warning"
                });
            }
            axios
                .post("/game/skill/prophet", {
                    gameId: this.game.id,
                    targetUserId: this.scanUserId
                })
                .then(res => {
                    this.scanResultBackupUserIds.push(this.scanUserId);
                    this.isScanedTonight = true;
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        closeProphetSkillDialog() {
            this.prophetSkillDialogVisible = false;
            if (this.isScanedTonight) {
                axios
                    .post("/game/skill/prophet_end", {
                        gameId: this.game.id,
                        targetUserId: this.werewolfKillUserId
                    })
                    .then(res => {
                        this.scanResultBackupUserIds.push(this.scanUserId);
                        this.isScanedTonight = true;
                        this.prophetSkillDialogVisible = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        useKnightSkill() {
            if (!Boolean(this.knightKillUserId)) {
                this.$message({
                    message: "請先選擇查驗對象",
                    type: "warning"
                });
            }
            axios
                .post("/game/skill/knight", {
                    gameId: this.game.id,
                    targetUserId: this.knightKillUserId
                })
                .then(res => {
                    this.knightSkillDialogVisible = false;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        vote() {
            if (!this.voteUserId) {
                this.$message({
                    message: "請先選擇投票對象",
                    type: "warning"
                });
            }
            axios
                .post("/game/vote/action", {
                    gameId: this.game.id,
                    targetUserId: this.voteUserId
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        triggerDayEnd() {
            this.loading = true;
            axios
                .post("/game/dayEnd", {
                    gameId: this.game.id
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeStage(data) {
            console.log(data);
            let { game, gameUsers, gameLogs, soundData } = data;
            this.updateGame(game);
            this.updateGameLogs(gameLogs);
            this.updateGameUsers(gameUsers);
            if (this.Me.isRoomManager) {
                soundMechine.playByData(soundData);
            }
        },
        changeGameLogs(data) {
            let { gameLogs } = data;
            this.updateGameLogs(gameLogs);
        },
        handleEventService: function joinedRoom(roomId) {
            window.Echo.join(`room.${roomId}`)
                .here(this.FETCH_ROOM_USERS)
                .joining(this.handleUserJoined)
                .leaving(this.handleUserLeaving)
                .listen("Frontend\\StageChanged", this.changeStage)
                .listen("Frontend\\GameVote\\Voted", this.changeGameLogs);
        }
    }
};

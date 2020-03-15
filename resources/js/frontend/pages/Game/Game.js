import soundMechine from "../module/soundMechine";
import GameUser from "../module/GameUser";
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: "Game",
    data: function() {
        return {
            isGameStarted: false,
            loading: false,
            roleDialogVisible: false,
            werewolfSkillDialogVisible: false,
            prophetSkillDialogVisible: false,
            knightSkillDialogVisible: false,
            werewolfKillUserId: null,
            isScanedTonight: false,
            scanUserId: null,
            scanResultBackupUserIds: [], // 在預言家查驗時先呈現給使用者看，不必再等 game_log 更新，但寫法需要再思考
            gameRecordDialogVisible: false,
            knightKillUserId: null
        };
    },
    computed: {
        ...mapState([
            'auth',
            'room',
            'game',
            'auth',
            'userMap',
            'gameLogs'
        ]),
        prophetScanedUserIds() {
            let logs = this.gameLogs;
            if(!Boolean(logs)){
                return [];
            }
            return logs.filter(row => row.skill === 'prophet').map( row => row.target_user_id);
        },
        GameUsers() {
            if (!Boolean(this.room)) {
                return null;
            }
            const gameUsers = this.$store.state.gameUsers;
            return gameUsers.map(gameUser => {
                return new GameUser(gameUser, this.room);
            })
        },
        GameUserMap() {
            if (!Boolean(this.GameUsers)) {
                return null;
            }
            let object = {};
            _.forEach(this.GameUsers, function(user) {
                object[user.userId] = user;
            });
            return object;
        },
        Me() {
            if (!Boolean(this.GameUserMap) || !this.auth) {
                return {};
            }
            return this.GameUserMap[this.auth.id];
        }
    },
    created() {
        let self = this;
        this.fetchAuth();
        this.fetchGameData().then(function() {
            self.handleEventService(self.room.id);
        });
    },
    mounted() {},
    methods: {
        ...mapMutations({
            FETCH_ROOM_USERS: 'FETCH_ROOM_USERS',
            updateGame: 'FETCH_GAME',
            updateGameUsers: 'UPDATE_GAME_USERS',
            updateGameLogs: 'FETCH_GAME_LOGS'
        }),
        ...mapActions([
            'fetchAuth',
            'fetchGameData',
            'handleUserJoined',
            'handleUserLeaving'
        ]),
        showSkillDialog() {
            if (!Boolean(this.Me)) {
                this.$message({
                    message: "伺服器忙碌中",
                    type: "warning"
                });
            }
            if(this.Me.isCivilian || this.Me.isSkillAllowed == false){
                this.$message({
                    message: "沒有技能可使用哦"
                });
            }else if(this.Me.isWereworlf){
                this.werewolfSkillDialogVisible = true;
            }else if(this.Me.isProphet){
                this.prophetSkillDialogVisible = true;
            }else if(this.user.isKnight){
                this.knightSkillDialogVisible = true;
            }else{
                this.$message({
                    message: "沒有技能可使用哦!"
                });
            }
        },
        startGame(){
            this.loading = true;
            axios
                .post("/game/start",{
                    gameId: this.game.id
                })
                .then(res => {
                    this.isGameStarted = true;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        useWerewolfSkill(){
            if(!Boolean(this.werewolfKillUserId)){
                this.$message({
                    message: "請先選擇殺人對象",
                    type: "warning"
                });
            } 
            this.loading = true;
            axios
                .post("/game/skill/werewolf",{
                    gameId: this.game.id,
                    targetUserId:  this.werewolfKillUserId
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
        useProphetSkill(){
            if(!Boolean(this.scanUserId)){
                this.$message({
                    message: "請先選擇查驗對象",
                    type: "warning"
                });
            } 
            axios
                .post("/game/skill/prophet",{
                    gameId: this.game.id,
                    targetUserId:  this.scanUserId
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
        closeProphetSkillDialog(){
            this.prophetSkillDialogVisible = false
            if(this.isScanedTonight){
                axios
                    .post("/game/skill/prophet_end",{
                        gameId: this.game.id,
                        targetUserId:  this.werewolfKillUserId
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
        useKnightSkill(){
            if(!Boolean(this.knightKillUserId)){
                this.$message({
                    message: "請先選擇查驗對象",
                    type: "warning"
                });
            } 
            axios
                .post("/game/skill/knight",{
                    gameId: this.game.id,
                    targetUserId:  this.knightKillUserId
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
        changeStage(data){
            console.log(data);
            let {
                game,
                gameUsers,
                gameLogs,
                soundData
            } = data;
            this.updateGame(game);
            this.updateGameLogs(gameLogs);
            this.updateGameUsers(gameUsers);
            if (this.Me.isRoomMajor) {
                soundMechine.playByData(soundData);
            }
        },
        handleEventService: function joinedRoom(roomId) {
            window.Echo.join(`room.${roomId}`)
                .here(this.FETCH_ROOM_USERS)
                .joining(this.handleUserJoined)
                .leaving(this.handleUserLeaving)
                .listen("Frontend\\StageChanged", this.changeStage)
        }
    }
};

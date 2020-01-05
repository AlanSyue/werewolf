import soundMechine from "./module/soundMechine";
import GameUser from "./module/GameUser";
import { mapMutations } from 'vuex'

export default {
    name: "Game",
    data: function() {
        return {
            isGameStarted: false,
            loading: false,
            roleDialogVisible: false,
            werewolfSkillDialogVisible: false,
            prophetSkillDialogVisible: false,
            werewolfKillUserId: null,
            isScanedTonight: false,
            scanUserId: null,
            scanResultBackupUserIds: [], // 在預言家查驗時先呈現給使用者看，不必再等 game_log 更新，但寫法需要再思考
            gameRecordDialogVisible: false
        };
    },
    computed: {
        room() {
            return this.$store.state.room;
        },
        game() {
            return this.$store.state.game;
        },
        gameLogs() {
            return this.$store.state.gameLogs;
        },
        prophetScanedUserIds() {
            let logs = this.$store.state.gameLogs;
            if(!Boolean(logs)){
                return [];
            }
            return logs.filter(row => row.skill === 'prophet').map( row => row.target_user_id);
        },
        auth() {
            return this.$store.state.auth;
        },
        roomUserMap() {
            let users = this.$store.state.users;
            let object = {};
            _.forEach(users, function(user) {
                object[user.id] = user;
            });
            return object;
        },
        GameUsers() {
            if (!Boolean(this.room)) {
                return null;
            }
            let users = this.$store.state.gameUsers;
            users.sort((a,b)=>{
                return a.seat_index - b.seat_index;
            });
            return users.map(data => {
                return new GameUser(data, this.room);
            })
        },
        GameUserMap() {
            if (!Boolean(this.GameUsers)) {
                return null;
            }
            let object = {};
            _.forEach(this.GameUsers, function(user) {
                object[user.user_id] = user;
            });
            return object;
        },
        user() {
            if (!Boolean(this.GameUserMap) || !this.auth) {
                return null;
            }
            return this.GameUserMap[this.auth.id];
        }
    },
    created() {
        let self = this;
        this.$store.dispatch("fetchAuth");
        this.$store.dispatch("fetchGameData").then(function() {
            self.handleEventService(self.room.id);
        });
    },
    mounted() {},
    methods: {
        ...mapMutations({
            updateGame: 'FETCH_GAME',
            updateGameUsers: 'UPDATE_GAME_USERS',
            updateGameLogs: 'FETCH_GAME_LOGS'
        }),
        showSkillDialog() {
            if (!Boolean(this.user)) {
                this.$message({
                    message: "伺服器忙碌中",
                    type: "warning"
                });
            }
            if(this.user.isCivilian || this.user.isSkillAllowed == false){
                this.$message({
                    message: "沒有技能可使用哦"
                });
            }else if(this.user.isWereworlf){
                this.werewolfSkillDialogVisible = true;
            }else if(this.user.isProphet){
                this.prophetSkillDialogVisible = true;
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
            if (this.user.isRoomMajor) {
                soundMechine.playByData(soundData);
            }
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
                .listen("Frontend\\StageChanged", this.changeStage)
        }
    }
};

import soundMechine from "../module/soundMechine";
import GameUser from "../module/GameUser";
import { mapMutations, mapState } from 'vuex'

export default {
    name: "Game",
    data: function() {
        return {
            isGameStarted: false,
            loading: false,
            roleDialogVisible: false,
            werewolfSkillDialogVisible: false,
            werewolfKillUserId: null,
            gameRecordDialogVisible: false
        };
    },
    computed: {
        ...mapState([
            'room',
            'game',
            'auth',
            'userMap'
        ]),
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
        }),
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
        useWerelfSkill(){
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
        changeStage(data){
            console.log(data);
            let { game, gameUsers, soundData} = data;
            this.updateGame(game);
            this.updateGameUsers(gameUsers);
            if (this.Me.isRoomMajor) {
                soundMechine.playByData(soundData);
            }
        },
        // changeToNight() {
        //     this.isNightMode = true;
        //     if (this.Me.isRoomMayor == true) {
        //         soundMechine
        //             .addSound("天黑請閉眼")
        //             .delay(3)
        //             .addSound("狼人現身請睜眼，狼人請殺人")
        //             .play();
        //     }
        // },
        // changeToMorning() {
        //     this.isNightMode = false;
        //     if (this.Me.isRoomMayor == true) {
        //         soundMechine
        //             .addSound("預言家請閉眼")
        //             .delay(3)
        //             .addSound("天亮請睜眼")
        //             .delay(1)
        //             .addSound("昨晚被淘汰的是這些玩家")
        //             .play();
        //     }
        // },
        // changeProphetMode() {
        //     if (this.Me.isRoomMayor == true) {
        //         soundMechine
        //             .addSound("女巫請閉眼")
        //             .delay(3)
        //             .addSound("預言家請睜眼，你要查驗的對象是")
        //             .play();
        //     }
        // },
        // changeWitchfMode() {
        //     if (this.Me.isRoomMayor == true) {
        //         soundMechine
        //             .addSound("狼人請閉眼")
        //             .delay(3)
        //             .addSound(
        //                 "女巫請睜眼，他被殺死了，你要救他嗎，你要使用毒藥嗎"
        //             )
        //             .play();
        //     }
        // },
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

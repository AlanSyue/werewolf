import { ROLE_KEY_MAP } from "./module/constant";
import playSound from "./module/soundMechine";

export default {
    name: "Game",
    data: function() {
        return {
            loading: false,
            roleDialogVisible: false,
            skillDialogVisible: false,
            gameRecordDialogVisible: false,
            isNightMode: false
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
            let users = this.$store.state.users;
            let object = {};
            _.forEach(users, function(user) {
                object[user.id] = user;
            });
            return object;
        },
        gameUsers() {
            let users = this.$store.state.gameUsers;
            let object = {};
            _.forEach(users, function(user) {
                user.role = ROLE_KEY_MAP[user.role_type];
                object[user.user_id] = user;
            });
            return object;
        },
        auth() {
            return this.$store.state.auth;
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
        playSound1: function() {
            this.isNightMode = true;
            return playSound("天黑請閉眼");
        },
        playSound2: function() {
            this.isNightMode = false;
            return playSound("天亮請睜眼");
        },
        playSound12: function() {
            let self = this;
            this.playSound1().then(function() {
                self.playSound2();
            });
        },
        handleEventService: function joinedRoom(roomId) {
            console.log(window.Echo);
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
                .listen("Frontend\\NightComing", e => {
                    this.isNightMode = true;
                });
        }
    }
};

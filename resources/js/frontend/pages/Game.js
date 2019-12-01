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
            return this.$store.state.users;
        },
        gameUsers() {
            return this.$store.state.gameUsers;
        },
        auth() {
            return this.$store.state.auth;
        },
        roomUserObject() {
            let object = {};
            _.forEach(this.roomUsers, function(user, key) {
                object[user.id] = user;
            });
            return object;
        }
    },
    created() {
        let self = this;
        this.$store.dispatch("fetchAuth");
        this.$store.dispatch("fetchGameData").then(function(){
            self.handleEventService(self.room.id);
        });;
    },
    mounted() {
    },
    methods: {
        playsSound(fileName) {
            return new Promise(function(resolve, reject) {
                // return a promise
                var audio = new Audio(); // create audio wo/ src
                audio.preload = "auto"; // intend to play through
                audio.autoplay = true; // autoplay when loaded
                audio.onerror = reject; // on error, reject
                audio.onended = resolve; // when done, resolve

                audio.src = fileName;
            });
        },
        playSound1() {
            this.isNightMode = true;
            return this.playsSound("sounds/天黑請閉眼.mp3");
        },
        playSound2() {
            this.isNightMode = false;
            return this.playsSound("sounds/天亮請睜眼.mp3");
        },
        playSound12() {
            this.playSound1().then(
                () => this.playSound2()
            );
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
                })
        }
    }
};

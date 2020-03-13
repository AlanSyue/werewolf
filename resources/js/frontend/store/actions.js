let actions = {
    fetchGameData({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/room/data")
                .then(res => {
                    const {game, room, users, gameUsers, readyUsers, gameLogs} = res.data.data;
                    commit("FETCH_GAME", game);
                    commit("UPDATE_ROOM", room);
                    commit("FETCH_ROOM_USERS", users);
                    commit("UPDATE_GAME_USERS", gameUsers);
                    commit("FETCH_READY_USERS", readyUsers);
                    commit("FETCH_GAME_LOGS", gameLogs);
                    resolve(res);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });  
        })
    },
    fetchAuth({ commit }) {
        axios
            .get("/auth")
            .then(res => {
                commit("FETCH_AUTH", res.data);
            })
            .catch(err => {
                console.error(err);
            });
    },
    updateRoomSeats({ commit }, seats) {
        let postData = {
            seats: seats.map(seat => {
                return {
                    user_id: seat.userId,
                    seat_index: seat.index
                }
            })
        };
        axios
            .post("/room/seats", postData)
            .then(res => {
                commit("UPDATE_GAME_USERS", res.data);
            })
            .catch(err => {
                console.error(err);
            });
    },
    createRoom({ commit }, roomData) {
        let post_data = {
            civilian_amount: roomData["civilianAmount"],
            prophet_amount: roomData["prophetAmount"],
            witch_amount: roomData["witchAmount"],
            knight_amount: roomData["knightAmount"],
            hunter_amount: roomData["hunterAmount"],
            werewolf_amount: roomData["werewolfAmount"],
            kingwolf_amount: roomData["kingwolfAmount"]
        };
        axios
            .post("/room/store", post_data)
            .then(function(res) {
                commit("UPDATE_ROOM", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    joinRoom({ commit }, pin_code) {
        let postData = {
            pin_code: pin_code
        };
        return axios
            .post("/room/join", postData)
            .then(function(res) {
                commit("UPDATE_ROOM", res.data);
                return res;
            })
    },
    handleUserJoined({ commit, state }, newUser){
        let users = state.users;
        users = users.filter(function(originUser) {
            return originUser.id != newUser.id;
        });
        users.push({
            id: newUser.id,
            firstName: newUser.first_name,
            fullName: newUser.full_name
        });
        commit("UPDATE_ROOM_USERS", users);
    },
    handleUserLeaving({ commit, state }, newUser){
        let users = state.users;
        users = users.filter(function(originUser) {
            return originUser.id != newUser.id;
        });
        users.push({
            id: newUser.id,
            firstName: newUser.first_name,
            fullName: newUser.full_name
        });
        commit("UPDATE_ROOM_USERS", users);
    }
};

export default actions;

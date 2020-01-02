let actions = {
    fetchGameData({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/room/data")
                .then(res => {
                    commit("FETCH_GAME", res.data.data.game);
                    commit("FETCH_ROOM", res.data.data.room);
                    commit("FETCH_ROOM_USERS", res.data.data.users);
                    commit("UPDATE_GAME_USERS", res.data.data.gameUsers);
                    commit("FETCH_READY_USERS", res.data.data.readyUsers);
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
            seats: seats
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
    createRoom({ commit }, room_data) {
        let post_data = {
            civilian_amount: room_data["civilian_amount"],
            prophet_amount: room_data["prophet_amount"],
            witch_amount: room_data["witch_amount"],
            knight_amount: room_data["knight_amount"],
            hunter_amount: room_data["hunter_amount"],
            werewolf_amount: room_data["werewolf_amount"],
            kingwolf_amount: room_data["kingwolf_amount"]
        };
        axios
            .post("/room/store", post_data)
            .then(function(res) {
                commit("CREATE_ROOM", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    joinRoom({ commit }, pin_code) {
        let post_data = {
            pin_code: pin_code
        };
        return axios
            .post("/room/join", post_data)
            .then(function(res) {
                commit("FETCH_ROOM", res.data);
                return res;
            })
    },
};

export default actions;

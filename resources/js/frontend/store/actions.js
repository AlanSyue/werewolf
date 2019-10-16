let actions = {
    fetchGameData({ commit }) {
        axios
            .get("/rooms/data")
            .then(res => {
                commit("FETCH_GAME", res.data.data.game);
                commit("FETCH_ROOM", res.data.data.room);
                commit("FETCH_ROOM_USERS", res.data.data.users);
                commit("UPDATE_GAME_USERS", res.data.data.gameUsers);
            })
            .catch(err => {
                console.log(err);
            });
    },
    fetchAuth({ commit }) {
        axios
            .get("/auth")
            .then(res => {
                commit("FETCH_AUTH", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    updateRoomSeats({ commit }, seats) {
        let postData = {
            seats: seats
        };
        axios
            .post("/rooms/seats", postData)
            .then(res => {
                commit("UPDATE_GAME_USERS", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export default actions;

let actions = {
    fetchGameData({ commit }) {
        axios
            .get("/rooms/data")
            .then(res => {
                commit("FETCH_GAME", res.data.data.game);
                commit("FETCH_ROOM", res.data.data.room);
                commit("FETCH_SEATS", res.data.data.seats);
                commit("FETCH_ROOM_USERS", res.data.data.users);
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
    updateRoomSeats({ commit }, seats){
        let postData = {
            seats : seats
        };
        axios
            .post("/rooms/seats", postData)
            .then(res => {
                let data = res.data;
                let seats = res.data.map(function(gameUser){
                    return {
                        id : gameUser.seat_index,
                        user_id : gameUser.user_id
                    };
                })
                commit("UPDATE_SEATS", seats);
                commit("UPDATE_GAME_USERS", data);
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export default actions;

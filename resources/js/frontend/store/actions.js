let actions = {
    fetchGameData({ commit }) {
        axios
            .get("/rooms/data")
            .then(res => {
                commit("FETCH_GAME_DATA", res.data.data);
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
    }
};

export default actions;

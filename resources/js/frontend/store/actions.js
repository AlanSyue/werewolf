let actions = {
    fetchRoom({ commit }) {
        axios
            .get("/rooms/data")
            .then(res => {
                commit("FETCH_ROOM", res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
};

export default actions;

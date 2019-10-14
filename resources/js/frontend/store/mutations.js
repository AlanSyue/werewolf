let mutations = {
    FETCH_GAME_DATA(state, gameData) {
        return (state.gameData = gameData);
    },
    FETCH_ROOM_USERS(state, users) {
        return (state.gameData.users = users);
    },
    FETCH_AUTH(state, auth) {
        return (state.auth = auth);
    }
};
export default mutations;

let mutations = {
    FETCH_GAME(state, game) {
        return (state.game = game);
    },
    FETCH_ROOM(state, room) {
        return (state.room = room);
    },
    FETCH_SEATS(state, seats) {
        return (state.seats = seats);
    },
    UPDATE_SEATS(state, seats) {
        return (state.seats = seats);
    },
    FETCH_ROOM_USERS(state, users) {
        return (state.users = users);
    },
    UPDATE_GAME_USERS(state, gameUsers) {
        return (state.gameUsers = gameUsers);
    },
    FETCH_AUTH(state, auth) {
        return (state.auth = auth);
    }
};
export default mutations;

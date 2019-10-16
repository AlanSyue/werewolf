let getters = {
    auth: state => {
        return state.auth;
    },
    game: state => {
        return state.game;
    },
    room: state => {
        return state.room;
    },
    users: state => {
        return state.users;
    },
    gameUsers: state => {
        return state.gameUsers;
    }
};

export default getters;

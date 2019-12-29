import defaultRoom from "./stateDefault/room";
import defaultGame from "./stateDefault/game";
import defaultUser from "./stateDefault/users";
import defaultGameUsers from "./stateDefault/gameUsers";
import defaultAuth from "./stateDefault/auth";
import defaultReadyUsers from "./stateDefault/readyUsers";

let state = {
    room: defaultRoom,
    game: defaultGame,
    users: defaultUser,
    gameUsers: defaultGameUsers,
    auth: defaultAuth,
    readyUsers: defaultReadyUsers,
};

export default state;

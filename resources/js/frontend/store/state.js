import defaultRoom from "./stateDefault/room";
import defaultGame from "./stateDefault/game";
import defaultGameLogs from "./stateDefault/gameLogs";
import defaultUser from "./stateDefault/users";
import defaultGameUsers from "./stateDefault/gameUsers";
import defaultAuth from "./stateDefault/auth";

let state = {
    room: defaultRoom,
    game: defaultGame,
    gameLogs: defaultGameLogs,
    users: defaultUser,
    gameUsers: defaultGameUsers,
    auth: defaultAuth
};

export default state;

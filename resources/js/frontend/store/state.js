import defaultRoom from "./stateDefault/room";
import defaultGame from "./stateDefault/game";
import defaultGameLogs from "./stateDefault/gameLogs";
import defaultUser from "./stateDefault/users";
import defaultUserMap from "./stateDefault/userMap";
import defaultGameUsers from "./stateDefault/gameUsers";
import defaultAuth from "./stateDefault/auth";
import defaultReadyUserIds from "./stateDefault/readyUserIds";

let state = {
    room: defaultRoom,
    game: defaultGame,
    gameLogs: defaultGameLogs,
    users: defaultUser,
    userMap: defaultUserMap,
    gameUsers: defaultGameUsers,
    auth: defaultAuth,
    readyUserIds: defaultReadyUserIds
};

export default state;

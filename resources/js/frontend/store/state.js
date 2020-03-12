import defaultRoom from "./stateDefault/room";
import defaultGame from "./stateDefault/game";
import defaultUser from "./stateDefault/users";
import defaultUserMap from "./stateDefault/userMap";
import defaultGameUsers from "./stateDefault/gameUsers";
import defaultAuth from "./stateDefault/auth";

let state = {
    room: defaultRoom,
    game: defaultGame,
    users: defaultUser,
    userMap: defaultUserMap,
    gameUsers: defaultGameUsers,
    auth: defaultAuth
};

export default state;

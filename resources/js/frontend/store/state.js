import defaultRoom from "./stateDefault/room";
import defaultGame from "./stateDefault/game";
import defaultUser from "./stateDefault/users";
import defaultSeats from "./stateDefault/seats";
import defaultGameUsers from "./stateDefault/gameUsers";
import defaultAuth from "./stateDefault/auth";

let state = {
    room: defaultRoom,
    game: defaultGame,
    users: defaultUser,
    gameUsers: defaultGameUsers,
    seats: defaultSeats,
    auth: defaultAuth
};

export default state;

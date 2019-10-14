let defaultGameData = {
    room: {
        id: 0,
        mayor_user_id: 0,
        pin_code: ""
    },
    game: {
        id: 0,
        room_id: 0,
        status: 0,
        civilian_amount: 0,
        werewolf_amount: 0,
        snowwolf_amount: 0,
        kingwolf_amount: 0,
        prophet_amount: 0,
        witch_amount: 0,
        knight_amount: 0,
        hunter_amount: 0,
        created_at: "",
        updated_at: ""
    },
    users: [],
    seats: [
        {
            id: 1,
            user_id: 0
        },
        {
            id: 2,
            user_id: 0
        },
        {
            id: 3,
            user_id: 0
        },
        {
            id: 4,
            user_id: 0
        }
    ]
};

export default defaultGameData;


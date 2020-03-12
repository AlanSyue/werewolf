let mutations = {
    FETCH_GAME(state, game) {
        const transformGame = {
            id: game.id,
            roomId: game.room_id,
            day: game.day,
            stage: game.stage, 
            status: game.status,
            civilianAmount: game.civilian_amount,
            hunterAmount: game.hunterAmount,
            witchAmount:0,
            werewolfAmount: game.werewolf_amount,
            kingwolfAmount: game.kingwolf_amount, 
            knightAmount: game.knight_amount, 
            prophetAmount: game.prophet_amount,
            snowwolfAmount: game.snowwolf_amount,
        };
        return (state.game = transformGame);
    },
    UPDATE_ROOM(state, room) {
        const transformRoom = {
            id: room.id,
            mangerUserId: room.mayor_user_id,
            pinCode: room.pin_code,
        };
        return (state.room = transformRoom);
    },
    FETCH_ROOM_USERS(state, users) {
        const transformUsers = users.map(user => {
            return {
                id: user.id,
                firstName: user.first_name,
                fullName: user.full_name
            };
        });
        let transformUserMap = {};
        _.forEach(transformUsers, function(user) {
            transformUserMap[user.id] = user;
        });
        
        state.users = transformUsers;
        state.userMap = transformUserMap;
    },
    UPDATE_ROOM_USERS(state, users) {
        return (state.users = users);
    },
    UPDATE_GAME_USERS(state, gameUsers) {
        const transformGameUsers = gameUsers.sort((u1, u2) => {
            return u1.seat_index - u2.seat_index;
        }).map(gameUser => {
            let {
                id: id,
                game_id: gameId,
                user_id: userId,
                is_live: isLive,
                is_skill_allowed: isSkillAllowed,
                role_type: roleType,
                seat_index: seatIndex,
                skill_use_status: skillUseStatus
            } = gameUser;
            return {id, userId, gameId, isLive, isSkillAllowed, roleType, seatIndex, skillUseStatus};
        })
        return (state.gameUsers = transformGameUsers);
    },
    FETCH_AUTH(state, auth) {
        return (state.auth = auth);
    }
};
export default mutations;

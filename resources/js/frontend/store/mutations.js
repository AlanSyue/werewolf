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
            witchAmount: 0,
            werewolfAmount: game.werewolf_amount,
            kingwolfAmount: game.kingwolf_amount,
            knightAmount: game.knight_amount,
            prophetAmount: game.prophet_amount,
            snowwolfAmount: game.snowwolf_amount
        };
        return (state.game = transformGame);
    },
    UPDATE_ROOM(state, room) {
        const transformRoom = {
            id: room.id,
            managerUserId: room.mayor_user_id,
            pinCode: room.pin_code
        };
        return (state.room = transformRoom);
    },
    UPDATE_ROOM_USERS(state, users) {
        let userMap = {};
        _.forEach(users, function(user) {
            userMap[user.id] = user;
        });
        state.users = users;
        state.userMap = userMap;
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
    UPDATE_GAME_USERS(state, gameUsers) {
        const transformGameUsers = gameUsers
            .sort((u1, u2) => {
                return u1.seat_index - u2.seat_index;
            })
            .map(gameUser => {
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
                return {
                    id,
                    userId,
                    gameId,
                    isLive,
                    isSkillAllowed,
                    roleType,
                    seatIndex,
                    skillUseStatus
                };
            });
        return (state.gameUsers = transformGameUsers);
    },
    UPDATE_READY_USERS(state, userReadyStatus) {
        let readyUserIds = Object.keys(userReadyStatus)
            .map(userId => {
                return {
                    userId: Number(userId),
                    readyStatus: Number(userReadyStatus[userId])
                };
            })
            .filter(user => {
                return user.readyStatus;
            })
            .map(user => user.userId);

        state.readyUserIds = readyUserIds;
    },
    FETCH_AUTH(state, auth) {
        return (state.auth = auth);
    },
    FETCH_GAME_LOGS(state, gameLogs) {
        let translatedGameLogs = gameLogs.map( log => {
            const {
                id: id,
                game_id: gameId,
                user_id: userId,
                target_user_id: targetUserId,
                stage: stage,
                day: day,
                skill
            } = log;
            return {id, gameId, userId, targetUserId, stage, day, skill}
        });
        return (state.gameLogs = translatedGameLogs);
    }
};
export default mutations;

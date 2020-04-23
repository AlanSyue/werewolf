import { ROLE_KEY_MAP } from "./constant";

class GameUser{
    constructor({gameUser, room, gameLogs, game}) {
        const {
            gameId,
            isLive,
            seatIndex,
            isSkillAllowed,
            skill_use_status,
            roleType,
            userId
        } = gameUser;
        this.userId = userId;
        this.gameId = gameId;
        this.isLive = isLive;
        this.seatIndex = seatIndex;
        this.isSkillUsed = Boolean(skill_use_status);
        this.isSkillAllowed = Boolean(isSkillAllowed);
        this.roleType = roleType;
        this.role = ROLE_KEY_MAP[roleType];
        this.isRoomManager = userId == room.managerUserId;
        this.isWereworlf = this.isWerewolf(this.role);
        this.isProphet = this.role.enName == 'prophet';
        this.isWitch = this.role.enName == 'witch';
        this.isKnight = this.role.enName == 'knight';
        this.isHunter = this.role.enName == 'hunter';
        this.isCivilian = this.role.enName == 'civilian';
        this.isVoted = gameLogs.filter( log => {
            return log.userId == userId && log.skill === 'vote' && log.day == game.day
        }).length > 0;
    }
    
    isWerewolf(role){
        return role.enName == 'werewolf' || role.enName == 'snowwolf' || role.enName == 'kingwolf';
    }
}

export default GameUser;
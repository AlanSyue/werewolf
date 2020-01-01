import { ROLE_KEY_MAP } from "./constant";

class GameUser{
    constructor(data, room) {
        const {
            game_id,
            is_live,
            seat_index,
            is_skill_allowed,
            skill_use_status,
            role_type,
            user_id
        } = data;
        this.user_id = user_id;
        this.game_id = game_id;
        this.is_live = is_live;
        this.seat_index = seat_index;
        this.isSkillUsed = Boolean(skill_use_status);
        this.isSkillAllowed = Boolean(is_skill_allowed);
        this.role_type = role_type;
        this.role = ROLE_KEY_MAP[role_type];
        this.isRoomMajor = user_id == room.mayor_user_id;
        this.isWereworlf = this.isWerewolf(this.role);
        this.isProphet = this.role.enName == 'prophet';
        this.isWitch = this.role.enName == 'witch';
        this.isKnight = this.role.enName == 'knight';
        this.isHunter = this.role.enName == 'hunter';
        this.isCivilian = this.role.enName == 'civilian';
    }
    
    isWerewolf(role){
        return role.enName == 'werewolf' || role.enName == 'snowwolf' || role.enName == 'kingwolf';
    }
}

export default GameUser;
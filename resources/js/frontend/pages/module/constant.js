const ROLE_KEY_MAP = {
    1001: {
        enName: "civilian",
        name: "平民",
        introducation:
            "村民沒有任何特殊能力但有投票權，當神明或平民全死光好人陣營就輸了"
    },
    2001: {
        enName: "werewolf",
        name: "狼人",
        introducation:
            "每晚將殺死一個平民，把全部平民、或全部神職都淘汰後則壞人陣營獲勝"
    },
    2002: {
        enName: "snowwolf",
        name: "雪狼",
        introducation:
            "每晚將殺死一個平民，把全部平民、或全部神職都淘汰後則壞人陣營獲勝，在被預言家查驗時不會顯露為壞人陣營"
    },
    2003: {
        enName: "kingwolf",
        name: "狼王",
        introducation:
            "每晚將殺死一個平民，把全部平民、或全部神職都淘汰後則壞人陣營獲勝，除了被女巫毒死外，再死後可以帶走一名玩家一起出局"
    },
    3001: {
        enName: "prophet",
        name: "預言家",
        introducation: "預言家每晚可以確認一個人的真實身份，"
    },
    3002: {
        enName: "witch",
        name: "女巫",
        introducation:
            "女巫有兩瓶藥水。一瓶是解藥，可以在當晚救回一個被狼人殺死的死者；另一瓶是毒藥，可以殺死任意一個活著的人。一局遊戲，女巫每瓶藥只能使用一次，每晚只能用一瓶藥。女巫不可以自救。女巫在使用出解藥後的回合，不在獲得狼人的殺人信息。"
    },
    3003: {
        enName: "knight",
        name: "騎士",
        introducation:
            "在白天發言時自己表明身份查驗一人，如此人是狼人則淘汰出局，如不是則以死謝罪，成功查驗時當天馬上進入天黑"
    },
    3004: {
        enName: "hunter",
        name: "獵人",
        introducation:
            "當獵人被狼人殺掉或者被平民無辜票死後，他可以開槍帶走一個人，當獵人被女巫毒死，不能開槍射殺人。"
    }
};

export { ROLE_KEY_MAP };

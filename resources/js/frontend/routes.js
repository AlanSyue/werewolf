import NotFound from "./pages/NotFound/NotFound.vue";
import Empty from "./pages/Empty/Empty.vue";
import Login from "./pages/Login/Login.vue";
import Home from "./pages/Home/Home.vue";
import Room from "./pages/Room/Room.vue";
import RoomCreate from "./pages/RoomCreate/RoomCreate.vue";
import RoomJoin from "./pages/RoomJoin/RoomJoin.vue";
import Game from "./pages/Game/Game.vue";

const routes = [
    {
        path: "*",
        component: NotFound,
        meta: { title: "查無此頁面" }
    },
    {
        path: "/",
        component: Home,
        meta: {
            title: "狼人面紗",
            pageHeader: {
                hidden: true
            }
        }
    },
    {
        path: "/room",
        component: Room,
        meta: {
            title: "遊戲室",
            pageHeader: {
                hidden: true
            }
        }
    },
    {
        path: "/login",
        component: Login,
        meta: { title: "登入頁" }
    },
    {
        path: "/admin/login",
        component: Empty,
        meta: { title: "後台登入" }
    },
    {
        path: "/room/create",
        component: RoomCreate,
        meta: {
            title: "建立遊戲",
            pageHeader: {
                hidden: true
            }
        }
    },
    {
        path: "/room/join",
        component: RoomJoin,
        meta: { title: "加入房間" }
    },
    {
        path: "/game",
        component: Game,
        meta: {
            title: "遊戲中",
            pageHeader: {
                hidden: true
            }
        }
    }
];

export default {
    mode: "history",
    linkActiveClass: "font-bold",
    routes: routes
};

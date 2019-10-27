import NotFound from "./pages/NotFound.vue";
import Empty from "./pages/Empty.vue";
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import Room from "./pages/Room.vue";
import RoomCreate from "./pages/RoomCreate.vue";
import RoomJoin from "./pages/RoomJoin.vue";

const routes = [
    {
        path: "*",
        component: NotFound,
        meta: { title: "查無此頁面" }
    },
    {
        path: "/",
        component: Home,
        meta: { title: "狼人面紗" }
    },
    {
        path: "/room",
        component: Room,
        meta: { title: "遊戲室" }
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
        meta: { title: "建立遊戲" }
    },
    {
        path: "/room/join",
        component: RoomJoin,
        meta: { title: "加入房間" }
    }
];

export default {
    mode: "history",
    linkActiveClass: "font-bold",
    routes: routes
};

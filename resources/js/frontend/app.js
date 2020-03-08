
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import '../bootstrap';
import '../plugins';
import Vue from 'vue';
import ElementUI from "element-ui";
import "../../thirdParty/element-ui/theme/index.css";
import store from "./store/index";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.use(ElementUI);

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('page-header', require('./components/PageHeader/PageHeader.vue').default);

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const router = new VueRouter(routes);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

const app = new Vue({
    el: "#app",
    router,
    store,
    created() {
        this.$store.dispatch("fetchAuth");
    }
});

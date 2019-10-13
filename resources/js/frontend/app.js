
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import '../bootstrap';
import '../plugins';
import Vue from 'vue';



// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('example-component', require('./components/ExampleComponent.vue').default);


window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// const app = new Vue({
//     el: "#app"
// });


(function($, Echo) {
    const selectors = {
            msgForm: "#msg-form",
            msgInput: "#msg-input",
            sendMsgBtn: "#send-msg-btn",
            roomIdInput: "#room-id-input",
            chatListContainer: ".chat-list",
            authUserNameInput: "#auth-user-name-input",
            onlineListContainer: "#online-list-container"
        },
        roomId = $(selectors.roomIdInput).val(),
        authUserName = $(selectors.authUserNameInput).val();

    const joinedRoom = function() {
        Echo.join(`room.${roomId}`)
            .here(users => {
                console.log(users);
                let list = "";
                for (let i = 0; i < users.length; i++) {
                    list += `<div><a href="#">${users[i].name}</a></div>`;
                }

                $(selectors.onlineListContainer).append(list);
            })
            .joining(user => {
                let child = `<div><a href="#">${user.name}</a></div>`;
                $(selectors.onlineListContainer).append(child);
            })
            .leaving(user => {
                //
            })
            .listen("Frontend\\MessageCreated", e => {
                console.log(e);
                let chat = `<article class="chat-item right">
                <section class="chat-body">
                    <div class="panel b-light text-sm m-b-none">
                    <div class="panel-body">
                        <span class="arrow right"></span>
                        <strong><small class="text-muted"><i class="fa fa-ok text-success"></i>${e.message.user.first_name}</small></strong>
                        <p class="m-b-none">${e.message.body}</p>
                    </div>
                    </div>
                    <small class="text-muted"><i class="fa fa-ok text-success"></i>${e.message.created_at}</small>
                </section>
                </article>`;

                $(selectors.chatListContainer).append(chat);
            });
    };

    const sendMsg = function() {
        let msg = $(selectors.msgInput).val();

        if (msg) {
            axios
                .post("/messages/store", {
                    body: msg,
                    room_id: roomId
                })
                .then(function() {
                    $(selectors.msgInput).val("");

                    let chat = `<article class="chat-item right">
                <section class="chat-body">
                    <div class="panel b-light text-sm m-b-none">
                    <div class="panel-body">
                        <span class="arrow right"></span>
                        <strong><small class="text-muted"><i class="fa fa-ok text-success"></i></small></strong>
                        <p class="m-b-none">${msg}</p>
                    </div>
                    </div>
                    <small class="text-muted"><i class="fa fa-ok text-success"></i>${new Date()}</small>
                </section>
            </article>`;

                    $(selectors.chatListContainer).append(chat);
                })
                .catch(function(error) {
                    //
                });
        }
    };

    // const listenForWhisper = function() {
    //     Echo.private("message").listenForWhisper("typing", e => {
    //         $(selectors.whisperTyping).text(`${e.name} is typing...`);

    //         setTimeout(function() {
    //             $(selectors.whisperTyping).text("");
    //         }, 900);
    //     });
    // };

    // $(document.body).on("keypress", selectors.msgInput, whisper);
    $(document.body).on("click", selectors.sendMsgBtn, sendMsg);

    $(document).ready(function() {
        joinedRoom();
    });
})(window.$, window.Echo);
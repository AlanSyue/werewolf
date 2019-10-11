(function($, Echo) {
    const selectors = {
            messages: "#dashboard-messages"
        },
        userId = window.Laravel.userId;

    const joinChannel = function() {
        Echo.private(`App.User.${userId}`)
            .listen(".AnalysisDataCreated", e => {
            console.debug(e);
            let data = `
            <p>${e.message}2222</p>
        `;
            $(selectors.messages).append(data);
        });
    };


    $(document).ready(function() {
        joinChannel();;
    });
})(window.$, window.Echo);

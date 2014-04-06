define(['jquery', 'pubsub'], function ($, pubsub) {

    var logger = {
        init: function () {
            this.model = [];
            this.view = $('#log');
        },
        log: function (message) {
            this.model.push(message);
            this.view.append('<li>' + message + '</li>');
            console.log(message);
            pubsub('logger:log').publish(message);
            return this;
        },
        clear: function () {
            this.model = [];
            this.view.empty();
            pubsub('logger:clear').publish();
            return this;
        }
    };

    return logger;

});
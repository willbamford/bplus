define(['jquery'], function ($) {

  var topics = {},
    pubsub = function (id) {
        var callbacks,
            method,
            topic = id && topics[id];
    
        if (!topic) {
            callbacks = $.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (id) {
                topics[id] = topic;
            }
        }
        return topic;
    };

  return pubsub;
});

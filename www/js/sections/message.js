define(
    ['jquery', 'pubsub', 'sections/symbols', 'lib'],
    function ($, pubsub, symbols, lib) {
        var message = {
            init: function () {
                var self = this;
                this.$input = $('.message__input');
                this.$input.on('change', function () {
                    self.onChanged();
                });
                symbols.init('.message__symbols');
                this.subscribe();
            },
            onChanged: function () {
                pubsub('message:changed').publish(this.value());
            },
            value: function () {
                return this.$input.val();
            },
            setValue: function (message) {
                this.$input.val(message);
                this.onChanged();
            },
            subscribe: function () {
                var self = this;
                pubsub('symbol:selected').subscribe(function (symbol) {
                    var textBox = self.$input[0],
                        text = self.value(),
                        insertPoint;
                    // textBox.focus();
                    insertPoint = lib.getInputSelection(textBox).end;
                    text = text.slice(0, insertPoint) + '[' + symbol + ']' + text.slice(insertPoint);
                    self.setValue(text);
                });
            }
        };
        return message;
    }
);
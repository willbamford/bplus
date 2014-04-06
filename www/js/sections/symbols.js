define(
    ['jquery', 'fonts/12-symbols', 'sections/expander', 'pubsub'],
    function ($, fontSymbols, Expander, pubsub) {
        var symbols = {
            init: function (selector) {
                var self = this;
                this.$container = $(selector);
                this.$container.append(this.createListHtml(fontSymbols.glyphs));
                this.$list = this.$container.find('.symbols__content');
                this.$items = this.$list.find('.list__item');
                this.expander = new Expander(
                    '.message__symbols',
                    '.symbols__header',
                    '.symbols__content'
                );
                this.subscribe();
            },
            createListHtml: function (symbols) {
                var html = '<div class="symbols__content"><ul class="symbols__list list">',
                    i,
                    symbol,
                    name;

                for (symbol in symbols) {
                    if (symbols.hasOwnProperty(symbol)) {
                        name = symbols[symbol].name;
                        html += '<li class="list__item list__item--symbol-' + symbol +
                        '">' + name + '</li>';
                    }
                }
                html += '</ul></div>';
                return html;
            },
            subscribe: function () {
                var self = this;
                this.$items.on('click', function (e) {
                    var classes = e.target.className,
                        matches = classes.match(/--symbol-([A-Za-z0-9-]+)(.+)?/),
                        symbol = matches[1];
                    self.select(symbol);
                    e.preventDefault();
                });
            },
            select: function (symbol) {
                pubsub('symbol:selected').publish(symbol);
            }
        };
        return symbols;
    }
);
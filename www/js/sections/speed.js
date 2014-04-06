define(
    ['jquery', 'sections/expander', 'pubsub'],
    function ($, Expander, pubsub) {
        var section = {
            selectedClass: 'list__item--is-selected',
            init: function () {
                var self = this;
                this.$container = $('.section--speed');
                this.$container.append(this.createSpeedListHtml());
                this.$list = this.$container.find('.section__content');
                this.$items = this.$list.find('.list__item');
                this.$selectedItem = null;
                this.selectedSpeed = 0;
                this.expander = new Expander(
                    '.section--speed',
                    '.section__header',
                    '.section__content'
                );
                this.subscribe();
            },
            createSpeedListHtml: function () {
                var html = '<ul class="section__content list">',
                    i,
                    speed,
                    setting,
                    settings = [
                        {
                            label: 'Treacle',
                            speed: 2
                        },
                        {
                            label: 'Tortoise',
                            speed: 4
                        },
                        {
                            label: 'Slow',
                            speed: 6
                        },
                        {
                            label: 'Medium',
                            speed: 8
                        },
                        {
                            label: 'Fast',
                            speed: 9
                        },
                        {
                            label: 'Rapid',
                            speed: 10
                        }
                    ];

                for (i = 0; i < settings.length; i++) {
                    setting = settings[i];
                    html += '<li class="list__item list__item--speed-' + setting.speed +
                        '">' + setting.label + '</li>';
                }
                html += '</ul>';
                return html;
            },
            subscribe: function () {
                var self = this;
                this.$items.on('click', function (e) {
                    var classes = e.target.className,
                        matches = classes.match(/--speed-([A-Za-z0-9-]+)(.+)?/),
                        speed = matches[1];
                    self.select(speed);
                    e.preventDefault();
                });
            },
            itemBySpeed: function (speed) {
                return this.$list.find('.list__item--speed-' + speed);
            },
            select: function (speed) {
                var $item = this.itemBySpeed(speed);
                if (!$item.is(this.$selectedItem)) {
                    if (this.$selectedItem !== null) {
                        this.$selectedItem.removeClass(this.selectedClass);
                    }
                    $item.addClass(this.selectedClass);
                    this.$selectedItem = $item;
                    this.selectedSpeed = speed;
                    pubsub('speed:changed').publish(speed);
                }
            },
            value: function () {
                return this.selectedSpeed;
            }
        };
        return section;
    }
);
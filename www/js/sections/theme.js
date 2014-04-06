define(
    ['jquery', 'sections/expander', 'themes/themes', 'pubsub'],
    function ($, Expander, themes, pubsub) {
        var section = {
            selectedClass: 'list__item--is-selected',
            init: function () {
                var self = this;
                this.$container = $('.section--theme');
                this.$container.append(this.createThemeListHtml(themes.getDefList()));
                this.$list = this.$container.find('.section__content');
                this.$items = this.$list.find('.list__item');
                this.selectedType = null;
                this.$selectedItem = null;
                this.expander = new Expander(
                    '.section--theme',
                    '.section__header',
                    '.section__content'
                );
                this.subscribe();
            },
            createThemeListHtml: function (defList) {
                var html = '<ul class="section__content list">',
                    i,
                    def,
                    theme;

                for (i = 0; i < defList.length; i++) {
                    def = defList[i];
                    html += '<li class="list__item list__item--type-' + def.type +
                        '">' + def.name + '</li>';
                }
                html += '</ul>';
                return html;
            },
            subscribe: function () {
                var self = this;
                this.$items.on('click', function (e) {
                    var classes = e.target.className,
                        matches = classes.match(/--type-([A-Za-z0-9-]+)(.+)?/),
                        type = matches[1];
                    self.select(type);
                    e.preventDefault();
                });
            },
            itemByType: function (type) {
                return this.$list.find('.list__item--type-' + type);
            },
            select: function (type) {
                var $item = this.itemByType(type);
                if (!$item.is(this.$selectedItem)) {
                    if (this.$selectedItem !== null) {
                        this.$selectedItem.removeClass(this.selectedClass);
                    }
                    $item.addClass(this.selectedClass);
                    this.$selectedItem = $item;
                    this.selectedType = type;
                    pubsub('theme:changed').publish(type);
                }
            },
            value: function () {
                return this.selectedType;
            }
        };
        return section;
    }
);
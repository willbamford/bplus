define(
    ['jquery', 'pubsub', 'themes/themes'],
    function ($, pubsub, themes) {
        var theming = {
            current: null,
            init: function () {
                var self = this;
                pubsub('theme:changed').subscribe(function (type) {
                    self.setWithType(type);
                });
            },
            setWithType: function (type) {
                var def = themes.getDefByType(type),
                    pageTheme = def.pageTheme;
                    
                if (self.current !== pageTheme) {
                    if (self.current) {
                        $('body').removeClass('theme-' + self.current);
                    }
                    if (pageTheme) {
                        $('body').addClass('theme-' + pageTheme);
                    }
                    self.current = pageTheme;
                }  
            }
        };
        return theming;
    }
);
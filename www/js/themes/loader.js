define(['themes/static'], function (staticThemes) {

    var themes = {
        loadWithType: function (type, onLoad) {
            var path = 'themes/' + type;
            require([path], function (theme) {
                onLoad(theme);
            });
        }
    };

    return themes;
});
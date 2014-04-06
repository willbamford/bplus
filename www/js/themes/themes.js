define(
    [
        'themes/pixie-dust',
        'themes/plasma',
        'themes/psycho',
        'themes/static',
        'themes/waterfall'
    ],
    function () {

    var defList,
        themes,
        init;

    defList = [
        { type: 'waterfall', name: 'Waterfall', pageTheme: 'orange' },
        { type: 'pixie-dust', name: 'Pixie Dust', pageTheme: 'pink' },
        { type: 'psycho', name: 'Psycho', pageTheme: 'purple' },
        { type: 'plasma', name: 'Plasma', pageTheme: 'blue' },
        { type: 'square-orange', name: 'Bob', pageTheme: 'orange' },
        { type: 'neon-blue', name: 'Neon', pageTheme: 'purple' },
        { type: 'warm-pink', name: 'Warm Pink', pageTheme: 'pink' },
        { type: 'lime-green', name: 'Lime', pageTheme: 'green' },
        { type: 'red-2', name: 'Red II', pageTheme: 'red' },
        { type: 'orange-2', name: 'O II', pageTheme: 'orange' },
        { type: 'blue-2', name: 'Blue II', pageTheme: 'blue' },
        { type: 'pink-hearts', name: '&#10084; I', pageTheme: 'pink' },
        { type: 'fire-hearts', name: '&#10084; II', pageTheme: 'red' },
        { type: 'hifi', name: 'HiFi', pageTheme: 'yellow' },
        { type: 'deep-purple', name: 'Deep', pageTheme: 'purple' },
        { type: 'eighties-pc', name: '80s PC', pageTheme: 'green' },
        { type: 'retro-boy', name: 'Retro', pageTheme: 'yellow' },
        { type: 'old-tv', name: 'TV', pageTheme: 'cyan' },
        { type: 'red', name: 'Red', pageTheme: 'red' },
        { type: 'yellow', name: 'Yellow', pageTheme: 'yellow' },
        { type: 'green', name: 'Green', pageTheme: 'green' },
        { type: 'blue', name: 'Blue', pageTheme: 'blue' },
        { type: 'purple', name: 'Purple', pageTheme: 'purple' },
        { type: 'pink', name: 'Pink', pageTheme: 'pink' }
    ];

    themes = {
        defByType: {},
        getDefList: function () {
            return defList;
        },
        getDefByType: function (type) {
            return this.defByType[type];
        }
    };

    init = function () {
        var i = 0;
        for (i = 0; i < defList.length; i++) {
            themes.defByType[defList[i].type] = defList[i];
        }
    };

    init();

    return themes;
});
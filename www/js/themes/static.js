define(['stage/led', 'lib'], function (led, lib) {

    var defs,
        def,
        base,
        theme,
        ID = 0,
        NAME = 1,
        TYPE = 2,
        make;
    
    defs = [
        ['square-orange', 'Square Orange', led.type.squareOrange],
        ['neon-blue', 'Neon Blue', led.type.squareNeonBlue],
        ['warm-pink', 'Warm Pink', led.type.squareWarmPink],
        ['lime-green', 'Lime Green', led.type.squareLimeGreen],
        ['red-2', 'Red II', led.type.redII],
        ['orange-2', 'Orange II', led.type.orangeII],
        ['blue-2', 'Blue II', led.type.blueII],
        
        ['pink-hearts', 'Pink Hearts', led.type.pinkHearts],
        ['fire-hearts', 'Fire Hearts', led.type.fireHearts],
        ['hifi', 'HiFi', led.type.hiFi],
        ['deep-purple', 'Deep Purple', led.type.deepPurple],
        ['eighties-pc', '80s PC', led.type.eightiesPC],
        ['retro-boy', 'Retro Boy', led.type.retroBoy],
        ['old-tv', 'Old TV', led.type.oldTV],
        
        ['white', 'White', led.type.white],
        ['red', 'Red', led.type.red],
        ['orange', 'Orange', led.type.orange],
        ['yellow', 'Yellow', led.type.yellow],
        ['green', 'Green', led.type.green],
        ['cyan', 'Cyan', led.type.cyan],
        ['blue', 'Blue', led.type.blue],
        ['purple', 'Purple', led.type.purple],
        ['pink', 'Pink', led.type.pink]
    ];
    
    base = {
        init: function (def) {
            this.name = def[NAME];
            this.type = def[TYPE];
            return this;
        },
        usesTick: false,
        on: function (display) {
            this.display = display;
            this.display.fillLEDs(this.type);
        },
        off: function (display) {
            this.display = null;
        },
        setFrame: function (frame) {
            /* Do nothing */
        }
    };
    
    make = function (d) {
        define('themes/' + d[ID], [], function () {
            theme = lib.clone(base).init(d);
            return theme;
        });
    };

    for (var i = 0; i < defs.length; i++) {
        def = defs[i];
        make(def);
    }
});
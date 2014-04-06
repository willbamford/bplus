define(['stage/led', 'lib'], function (led, lib) {

    var theme = {
        name: 'Waterfall',
        usesTick: false,
        on: function (display) {
            this.display = display;
        },
        off: function (display) {
            this.display = null;
        },
        setFrame: function (frame) {
            
            var cols = this.display.cols,
                rows = this.display.rows,
                display = this.display,
                rowOffset,
                d,
                type,
                idx,
                types = [
                    led.type.squareOrange,
                    led.type.squareNeonBlue,
                    led.type.squareWarmPink,
                    led.type.squareLimeGreen,
                    led.type.red,
                    led.type.orange,
                    led.type.yellow,
                    led.type.green,
                    led.type.cyan,
                    led.type.blue,
                    led.type.purple,
                    led.type.pink,
                    led.type.redII,
                    led.type.orangeII,
                    led.type.blueII,
                    led.type.pinkHearts,
                    led.type.fireHearts,
                    led.type.hiFi,
                    led.type.deepPurple,
                    led.type.eightiesPC,
                    led.type.retroBoy,
                    led.type.oldTV
                ];

            for (var row = 0; row < rows; row++) {
                rowOffset = row * cols;
                idx = (((frame >> 2) + (rows - row)) >> 3) % types.length;
                type = types[idx];
                for (var col = 0; col < cols; col++) {
                    d = display.leds[rowOffset + col];
                    d.type = type;
                }
            }
        }
    };

    return theme;
});
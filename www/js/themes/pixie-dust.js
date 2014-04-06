define(['stage/led', 'lib'], function (led, lib) {
    
    var theme = {
        name: 'Pixie Dust',
        usesTick: false,
        on: function (display) {
            this.display = display;
            
            var cols = display.cols,
                rows = display.rows,
                rowOffset,
                r, d;
            for (var row = 0; row < rows; row++) {
                rowOffset = row * cols;
                for (var col = 0; col < cols; col++) {
                    d = display.getLED(col, row);
                    r = lib.randomInt(16);
                    if (r === 0) {
                        d.type = led.type.white;
                    } else if ((r & 1) === 0) {
                        d.type = led.type.purple;
                    } else {
                        d.type = led.type.pink;
                    }
                }
            }
        },
        off: function (display) {
            this.display = null;
        },
        setFrame: function (frame) {
            /* Do nothing */
        }
    };

    return theme;
});
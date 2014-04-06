define(['stage/led', 'lib'], function (led, lib) {
    
    var theme = {
        name: 'Psycho',
        usesTick: true,
        on: function (display) {
            this.display = display;
            
            var cols = this.display.cols,
                rows = this.display.rows,
                rowOffset,
                d;
            
            for (var row = 0; row < rows; row++) {
                rowOffset = row * cols;
                for (var col = 0; col < cols; col++) {
                    d = display.leds[rowOffset + col];
                    d.type = lib.randomInt(100) % 2;
                }
            }
        },
        off: function (display) {
            this.display = null;
        },
        setFrame: function (frame) {
            
            var cols = this.display.cols,
                rows = this.display.rows,
                display = this.display,
                rowOffset,
                d;
            
            for (var row = 0; row < rows; row++) {
                rowOffset = row * cols;
                for (var col = 0; col < cols; col++) {
                    d = display.leds[rowOffset + col];
                    
                    if (((frame + ((row + col) >> 2)) & 3) === 0) {
                        d.type = (d.type + 1) % led.numOfTypes;
                    }
                }
            }
        }
    };
    return theme;
});
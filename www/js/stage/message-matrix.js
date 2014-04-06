define(
    ['logger', 'stage/led', 'fonts/12-text', 'fonts/12-symbols', 'pubsub'],
    function (logger, led, text, symbols, pubsub) {

    var MessageMatrix = function (display, message) {

            this.display = display;
            this.cols = 0;
            this.rows = 0;
            this.leds = null; // Array
            this.scrollX = 0;
            this.scrollY = 0;
            this.frame = 0;
            this.firedPlayedOnce = false;
        
            this.nextMatrix = null;

            this.setMessage(message);
        };

        MessageMatrix.prototype.initLEDs = function (cols, rows) {
        
            var len = cols * rows,
                v = led.intensity.min;
        
            this.cols = cols;
            this.rows = rows;
        
            this.leds = [];
        
            for (var i = 0; i < len; i++) {
                this.leds.push(v);
            }
        
        };

        MessageMatrix.prototype.setLED = function (col, row, intensity) {
            this.leds[row * this.cols + col] = intensity;
        };

        MessageMatrix.prototype.setMessage = function (message) {
            
            var start = new Date().getTime(),
                c = '',
                cd,
                mw = 0,             // Message width
                mh = text.height,   // Message height
                textGlyphs = text.glyphs,
                symbolGlyphs = symbols.glyphs,
                cc = 0,             // Current column
                m = message,
                spacing = 1,
                pixels,
                runIndex, run, runMax, v,
                i,
                match,
                sym,
                cds = [];
            
            this.message = message;
            
            // Calculate total width and get character data
            for (i = 0; i < m.length; i++) {
                c = m[i].toUpperCase();
                cd = null;

                if (c === '[') {
                    match = m.indexOf(']', i);
                    if (match !== -1) {
                        sym = m.substring(i + 1, match).toLowerCase();
                        if (symbolGlyphs[sym]) {
                            cd = symbolGlyphs[sym];
                            mw += cd.width + spacing;
                            i += sym.length + 1;
                        }
                    }
                }

                if (!cd && textGlyphs[c]) {
                    cd = textGlyphs[c];
                    mw += cd.width + spacing;
                }

                if (cd) {
                    cds.push(cd);
                } else {
                    console.error('Unrecognised character: ' + c); 
                }
            }
            
            this.initLEDs(mw, mh);

            // Fill LEDs
            for (i = 0; i < cds.length; i++) {

                cd = cds[i];
                pixels = cd.pixels;
                runIndex = 0;
                v = pixels[runIndex][0];
                run = 0;
                runMax = pixels[runIndex][1];
                
                for (var row = 0; row < mh; row++) {
                    for (var col = cc; col < cc + cd.width; col++) {
                        
                        if (run >= runMax) {
                            runIndex++;
                            v = pixels[runIndex][0];
                            runMax = pixels[runIndex][1];
                            run = 0;
                        }
                        
                        this.setLED(col, row, v);
                        
                        run++;
                    }
                }

                cc += cd.width + spacing;
            }

            // console.log('MessageMatrix:setMessage took ' + (new Date().getTime() - start) + 'ms');
        };
        
        MessageMatrix.prototype.setFrame = function (frame) {
            
            // Slowdown
            // frame = frame >> 1;
            
            this.frame = frame;
            this.scrollX = this.display.cols - (this.frame % (this.cols + this.display.cols));

            if (!this.firedPlayedOnce &&
                (this.frame == this.cols + this.display.cols)) {
                pubsub('messageMatrix:playedOnce').publish(this);
                this.firedPlayedOnce = true;
            }
        };
        
        return MessageMatrix;
    }
);
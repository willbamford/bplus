define(
    ['jquery', 'stage/message-matrix', 'stage/led', 'stage/mapper', 'themes/loader'],
    function ($, MessageMatrix, led, mapper, themeLoader) {

        var Display = function (container, sprites, initialTheme) {

            var self = this;
            
            this.createCanvas(container);

            this.tileSize = 16;
            this.intervalId = false;
            this.leds = null;
            this.currentMatrix = null;
            this.frame = 0;
            this.visible = true;
            this.points = null;
            this.sprites = sprites;
            this.tickCount = 0;
            this.setSpeed(10);
            this.theme = initialTheme;

            $(window).on('resize', function () {
                self.onResize();
            });

            this.onResize();
        };
        
        Display.prototype.createCanvas = function (container) {

            this.container = container;
            this.$container = $(container);

            $('<canvas>').attr({
                class: 'stage__canvas'
            }).appendTo(this.$container);
            
            this.canvas = $('.stage__canvas')[0];
            this.$canvas = $(this.canvas);
            this.ctx = this.canvas.getContext('2d');
        };

        Display.prototype.onResize = function () {
            var self = this,
                containerWidth = this.$container.innerWidth(),
                canvasWidth = this.$canvas.innerWidth(),
                numCols = Math.ceil(containerWidth / this.tileSize),
                maxCols = 42;

            numCols = Math.min(numCols, maxCols);

            // Size changed
            if (numCols != this.cols) {
                this.cols = numCols;
                this.rows = 12;
                this.width = this.cols * this.tileSize;
                this.height = this.rows * this.tileSize;

                // Resize the canvas
                this.canvas.setAttribute('width', this.width);
                this.canvas.setAttribute('height', this.height);

                this.frame = 0;
                this.initLEDs();
                this.resetTheme();
                this.draw();
            }
        };

        Display.prototype.initLEDs = function () {
            
            var len = this.cols * this.rows,
                leds = null;
                
            leds = [];
            for (var i = 0; i < len; i++) {
                leds.push({
                    type: led.type.white,
                    intensity: 0
                });
            }
            this.leds = leds;
        };
        
        Display.prototype.getLED = function (col, row) {
            return this.leds[row * this.cols + col];
        };
        
        Display.prototype.setLED = function (col, row, type) {
            var d = this.getLED(col, row);
            d.type = type;
        };
        
        Display.prototype.fillLEDs = function (type) {
            
            var len = this.leds.length,
                d = null;
            
            for (var i = 0; i < len; i++) {
                d = this.leds[i];
                d.type = type;
            }
        };
        
        Display.prototype.clearLEDs = function () {
             
            var len = this.leds.length,
                d = null;
             
            for (var i = 0; i < len; i++) {
                d = this.leds[i];
                d.intensity = 0;
            }
        };
        
        Display.prototype.resetTheme = function () {
            if (this.theme) {
                this.theme.off();
                this.theme.on(this);
                this.theme.setFrame(this.frame);
            }
        };

        Display.prototype.setTheme = function (theme) {
            
            if (theme !== this.theme) {
                if (this.theme) {
                    this.theme.off();
                }
                this.theme = theme;
                this.theme.on(this);
                this.theme.setFrame(this.frame);
            }
        };
        
        Display.prototype.setSpeed = function (speed) {
            if (this.speed !== speed && speed <= 10 && speed >= 0) {
                this.speed = speed;
            }
        };

        Display.prototype.setFrame = function (frame) {

            this.frame = frame;
            
            this.clearLEDs();
            
            if (this.theme && !this.theme.usesTick) {
                this.theme.setFrame(frame);
            }
            
            if (this.currentMatrix) {

                var m = this.currentMatrix,
                    minX, minY,
                    maxX, maxY,
                    rowOffsetSrc, rowOffsetDst,
                    ledSrc, ledDst,
                    indexSrc, indexDst;
                    
                m.setFrame(frame);
                
                minX = Math.max(m.scrollX, 0);
                minY = Math.max(m.scrollY, 0);
                maxX = Math.min(m.cols + m.scrollX, this.cols);
                maxY = Math.min(m.rows + m.scrollY, this.rows);
                
                for (var row = minY; row < maxY; row++) {
                    
                    rowOffsetSrc = (row - m.scrollY) * m.cols;
                    rowOffsetDst = row * this.cols;
                    
                    for (var col = minX; col < maxX; col++) {
                        indexSrc = rowOffsetSrc + (col - m.scrollX);
                        indexDst = rowOffsetDst + col;
                        
                        ledDst = this.leds[indexDst];
                        ledDst.intensity = m.leds[indexSrc];
                    }
                }
            }
        };
        
        Display.prototype.update = function () {
            var interval = 11 - this.speed,
                shouldDraw = false;

            if (this.theme.usesTick) {
                this.theme.setFrame(this.tickCount);
                shouldDraw = true;
            }

            if (this.tickCount % interval === 0) {
                this.setFrame(this.frame + 1);
                shouldDraw = true;
            }

            if (shouldDraw) {
                this.draw();
            }

            this.tickCount += 1;
        };

        Display.prototype.draw = function () {

            var self = this,
                ctx = this.ctx,
                x = 0, y = 0,
                i = 0,
                d = null,
                len = this.cols * this.rows,
                tileSize = this.tileSize,
                spriteSize = 16,
                v = 0;
            
            for (var row = 0; row < this.rows; row++) {
                for (var col = 0; col < this.cols; col++) {
                    d = this.leds[i];
                    v = d.intensity;

                    self.ctx.drawImage(
                        self.sprites,
                        v * spriteSize,
                        d.type * spriteSize,
                        spriteSize, spriteSize,
                        x, y,
                        tileSize, tileSize
                    );

                    i++;
                    x += tileSize;
                }
                
                x = 0;
                y += tileSize;
            }
        };
        
        Display.prototype.setMessage = function (message) {
            if (message && message.length > 0) {
                this.currentMatrix = new MessageMatrix(this, message);
                this.setFrame(0);
            }
        };
        
        Display.prototype.setThemeByType = function (type) {
            var self = this;
            themeLoader.loadWithType(type, function (theme) {
                self.setTheme(theme);
                self.draw();
            });
        };

        Display.prototype.toggle = function () {
            this.visible = !this.visible;
        };
        
        return Display;
});
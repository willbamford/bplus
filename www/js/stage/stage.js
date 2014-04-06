define(
    ['jquery', 'stage/display', 'vendor/shims', 'themes/loader', 'pubsub'],
    function ($, Display, shims, themesLoader, pubsub) {

        return {
            init: function (onReady, messageSender) {

                var self = this;

                this.onReady = onReady;

                this.$container = $('.stage__container');
                this.initialThemeType = 'white';

                this.display = null;
                this.playing = false;
                this.playCount = 0;
                
                this.loadResources(function () {
                    self.onResourceLoad();
                });

                pubsub('message:changed').subscribe(function (message) {
                    window.log("Message changed: " + message);
                    if (!message) {
                        message = 'Tap to pause/play [thumb-up][smiley][lightning][heart]';
                    }
                    self.display.setMessage(message);
                });

                pubsub('theme:changed').subscribe(function (type) {
                    window.log("Theme changed: " + type);
                    self.display.setThemeByType(type);
                });

                pubsub('speed:changed').subscribe(function (speed) {
                    window.log("Speed changed: " + speed);
                    self.display.setSpeed(speed);
                });
            },

            loadResources: function (callback) {

                var self = this;

                // Load intial theme
                themesLoader.loadWithType(this.initialThemeType, function (theme) {

                    self.initialTheme = theme;

                    // Load sprites
                    self.sprites = new Image();
                    self.sprites.src = "images/LEDTileset_16x16_128x512.png";
                    self.sprites.onload = function () {
                        callback();
                    };
                });
            },

            onResourceLoad: function () {
                var self = this;
                this.requestId = null;
                this.display = new Display(
                    $('.stage')[0],
                    this.sprites,
                    this.initialTheme
                );
                this.display.setMessage(this.initialMessage);
                this.$container.on('click', function (e) {
                    e.preventDefault();

                    if (self.playing) {
                        self.stop();
                    } else {
                        self.play();
                    }
                });
                this.onReady();
            },

            togglePlay: function () {
                if (this.playing) {
                    this.stop();
                } else {
                    this.play();
                }
            },

            play: function () {
                var self = this;
                if (!this.playing) {
                    this.requestId = window.requestAnimationFrame(this.animate.bind(this));
                    this.$container.addClass('stage--is-playing');
                    this.$container.removeClass('stage--is-stopped');
                    this.playCount++;
                    this.playing = true;
                }
            },

            stop: function () {
                if (this.playing) {
                    this.$container.addClass('stage--is-stopped');
                    this.$container.removeClass('stage--is-playing');
                    this.playing = false;
                }
            },

            animate: function () {
                this.display.update();
                if (this.playing) {
                    this.requestId = window.requestAnimationFrame(this.animate.bind(this));
                }
            }
        };
    }
);
define(
    ['jquery', 'pubsub', 'vendor/screenfull'],
    function ($, pubsub, screenfull) {
        return {
            init: function () {
                var self = this;
                this.$container = $('.sections');
                this.$content = this.$container.find('.sections__content');

                this.toggleInit();
                this.fullscreenInit();

                this.allowAutoOpen = true;

                pubsub('messageMatrix:playedOnce').subscribe(function (matrix) {
                    if (self.allowAutoOpen) {
                        self.open();
                        self.allowAutoOpen = false;
                    }
                });
            },

            toggleInit: function () {
                var self = this;
                this.$toggleButton = this.$container.find('.sections__header-button--toggle');
                this.$toggleButton.on('click', function (e) {
                    e.preventDefault();
                    self.toggle();
                });
            },

            fullscreenInit: function () {
                this.$fullscreenButton = this.$container.find('.sections__header-button--fullscreen');
                if (screenfull.enabled) {
                    this.$fullscreenButton.on('click', function (e) {
                        e.preventDefault();
                        if (screenfull.enabled) {
                            screenfull.request($('.stage__container')[0]);
                        }
                    });
                } else {
                    this.$fullscreenButton.hide();
                }
            },

            toggle: function () {
                if (this.isOpen()) {
                    this.close();
                } else {
                    this.open();
                }
            },

            open: function () {
                if (!this.isOpen()) {
                    this.$content.slideToggle(250);
                    this.$container.addClass('sections--is-open');
                    this.$container.removeClass('sections--is-closed');
                    this.allowAutoOpen = false;
                }
            },

            close: function () {
                if (!this.isClosed()) {
                    this.$content.slideToggle(250);
                    this.$container.addClass('sections--is-closed');
                    this.$container.removeClass('sections--is-open');
                    this.allowAutoOpen = false;
                }
            },

            isOpen: function () {
                return this.$container.hasClass('sections--is-open');
            },

            isClosed: function () {
                return this.$container.hasClass('sections--is-closed');
            }
        };
    }
);
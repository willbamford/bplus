define(['jquery', 'pubsub'], function ($, pubsub) {
    
    var Expander = function (
        selector,
        headerSelector,
        contentSelector) {
        var self = this;
        this.$container = $(selector);
        this.$content = this.$container.find(contentSelector);
        this.$button = this.$container.find(headerSelector);
        this.$button.on('click', function (e) {
            e.preventDefault();
            self.toggle();
        });
    };

    Expander.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    };

    Expander.prototype.open = function () {
        if (!this.isOpen()) {
            this.$content.slideToggle(250);
            this.$container.addClass('expander--is-open');
            this.$container.removeClass('expander--is-closed');
        }
    };

    Expander.prototype.close = function () {
        if (!this.isClosed()) {
            this.$content.slideToggle(250);
            this.$container.addClass('expander--is-closed');
            this.$container.removeClass('expander--is-open');
        }
    };

    Expander.prototype.isOpen = function () {
        return this.$container.hasClass('expander--is-open');
    };

    Expander.prototype.isClosed = function () {
        return this.$container.hasClass('expander--is-closed');
    };
    
    return Expander;
});
define(
    ['jquery', 'sections/expander', 'share-url', 'pubsub'],
    function ($, Expander, shareUrl, pubsub) {
        var section = {
            init: function () {
                var self = this;
                this.$container = $('.section--share');
                this.$container.append(this.createShareListHtml());
                this.$list = this.$container.find('.section__content');
                this.$items = this.$list.find('.list__item');
                this.expander = new Expander(
                    '.section--share',
                    '.section__header',
                    '.section__content'
                );
                this.subscribe();
            },
            createShareListHtml: function () {
                var html = '<ul class="section__content list">',
                    i,
                    item,
                    items = [
                        {
                            label: 'Facebook',
                            name: 'facebook'
                        },
                        {
                            label: 'Twitter',
                            name: 'twitter'
                        },
                        {
                            label: 'Google+',
                            name: 'google-plus'
                        },
                        {
                            label: 'Email',
                            name: 'email'
                        }
                    ];

                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    html += '<li class="list__item list__item--share-' + item.name +
                        '">' + item.label + '</li>';
                }
                html += '</ul>';
                return html;
            },
            subscribe: function () {
                var self = this;
                this.$items.on('click', function (e) {
                    var classes = e.target.className,
                        matches = classes.match(/--share-([A-Za-z0-9-]+)(.+)?/),
                        name = matches[1];
                    self.select(name);
                    e.preventDefault();
                });
            },
            itemByName: function (name) {
                return this.$list.find('.list__item--speed-' + name);
            },
            select: function (name) {
                var $item = this.itemByName(name);

                if (name === 'facebook') {
                    this.selectFacebook();
                }
            },
            selectFacebook: function () {

                this.getShareLink(function (link, isShortened) {

                    var href = 'https://www.facebook.com/dialog/feed?' +
                        'app_id=' + 188965941307049 + '&' +
                        'display=popup&' +
                        'caption=' + 'This is the caption' + '&' +
                        'link=' + link + '&' +
                        'redirect_uri=' + 'http://bplus.io';

                    console.log(href);

                    window.open(href);

                    // https://www.facebook.com/dialog/feed?
                    //   app_id=145634995501895
                    //   &display=popup&caption=An%20example%20caption 
                    //   &link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fdialogs%2F
                    //   &redirect_uri=https://developers.facebook.com/tools/explorer

                    // var href = 'http://m.facebook.com/sharer.php?' +
                    //     'u=' + encodeURIComponent(link) + '&' +
                    //     't=' + encodeURIComponent('Checkout my message...'),
                    //     //'s=100&' +
                    //     //'p[title]=' + encodeURIComponent('Banner+ LED messages') + '&' +
                    //     //'p[summary]=' + encodeURIComponent("Free scrolling LED message service on mobile and the web") + '&' +
                    //     //'p[url]=' + encodeURIComponent(link) + '&' +
                    //     //'p[images][0]=' + encodeURIComponent('http://bplus.io/images/banner-plus-200x200.png'),
                    //     top = window.screen.height / 2 - (218),
                    //     left = window.screen.width / 2 - (313);

                    // window.open(
                    //     href,
                    //     'sharer',
                    //     'toolbar=0,status=0,width=626,height=256,top=' + top + ',left=' + left
                    // );
                });

                return false;
            },
            getShareLink: function (callback) {

                pubsub('app:requestState').publish(function (state) {

                    var url = 'http://bplus.io?';
                    url += 'm=' + encodeURIComponent(state.message).replace(/%20/g, "+") + '&';
                    url += 't=' + encodeURIComponent(state.theme) + '&';
                    url += 's=' + encodeURIComponent(state.speed);

                    callback(url, false);

                    // shareUrl.shorten(url, function (shortUrl, isShortened) {
                    //     callback(shortUrl, isShortened);
                    // });
                });

                // Need:
                // 1. Message (m)
                // 2. Sender, optional (n)
                // 3. Theme (t)
                // 4. Speed (s)
            }
        };
        return section;
    }
);
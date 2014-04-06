require(
    [
        'jquery',
        'stage/stage',
        'sections/message',
        'sections/theme',
        'sections/speed',
        'sections/share',
        'sections/sections',
        'page-theming',
        'lib',
        'vendor/fastclick',
        'pubsub'
    ],
    function (
        $, stage, message,
        theme, speed, share, sections,
        pageTheming, lib, FastClick, pubsub) {

        $(function () {

            var query = lib.query(),
                initialMessage = query.m ? query.m : null,
                initialThemeType = query.t ? query.t : 'waterfall',
                initialSpeed = query.s ? query.s : '8';
                messageSender = query.n ? query.n : null;

            FastClick.attach(document.body);

            stage.init(function () {

                window.setTimeout(function () {

                    message.init();
                    theme.init();
                    speed.init();
                    // share.init();
                    sections.init();
                    pageTheming.init();

                    message.setValue(initialMessage);
                    theme.select(initialThemeType);
                    speed.select(initialSpeed);

                    if (!messageSender) {
                        sections.open();
                    }

                    $('html').removeClass('app--is-loading').addClass('app--has-loaded');

                    pubsub('app:requestState').subscribe(function (callback) {
                        callback({
                            message: message.value(),
                            theme: theme.value(),
                            speed: speed.value()
                        });
                    });

                    stage.play();

                }, 200);

            }, messageSender);
        });
    }
);
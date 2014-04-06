define(
    ['jquery'],
    function ($) {
        var token = '6a21bf877de5080f6620ac7c91b5873d4309e695',
            apiHost = 'https://api-ssl.bitly.com',
            shareUrl = {
            shorten: function (url, callback) {
                var apiUrl = apiHost + '/v3/shorten?longUrl=' + encodeURIComponent(url) +
                    '&access_token=' + token;
                console.log('API URL: ' + apiUrl);
                $.getJSON(
                    apiUrl,
                    function (response) {
                        console.log(response);
                        var shortUrl = ((response || {}).data || {}).url,
                            isShortened = true;
                        if (!shortUrl) {
                            shortUrl = url;
                            isShortened = false;
                        }
                        callback(shortUrl, isShortened);
                    }
                );
            }
        };
        return shareUrl;
    }
);
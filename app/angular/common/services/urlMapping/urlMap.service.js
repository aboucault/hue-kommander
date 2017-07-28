(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('urlMap', urlMap);

    function urlMap($parse, appContext, urls) {
        return {
            replaceByRestURL: replaceByRestURL
        };

        ////////////////////

        /**
         * Replaces placeholders in url
         * @example: __REST__/lights -> http:/192.168.1.56/api/<username>/lights
         */
        function replaceByRestURL(url) {
            let restReplaced = url;
            if(url && url.indexOf(urls.rest) !== -1) {
                restReplaced = restReplaced.replace(urls.rest, urls.restURL);
            }
            if(restReplaced.indexOf(urls.user.username) !== -1) {
                restReplaced = restReplaced.replace(urls.user.username, appContext.currentEntity.username);
            }
            return restReplaced;
        }
    }
})();

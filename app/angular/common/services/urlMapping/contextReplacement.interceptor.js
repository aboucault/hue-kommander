(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('contextReplacementInterceptor', ContextReplacementInterceptor);

    /* @ngInject */
    function ContextReplacementInterceptor($injector) {
        var interceptor = {
            request: request
        };

        return interceptor;

        //////////////////////////

        function request(config) {
            try {
                config.url = $injector.get('urlMap').replaceByRestURL(config.url);
            } catch(e) {
                // if no username is found, go to settings page
                $injector.get('$state').go('settings');

                // and cancel request
                var canceler = $injector.get('$q').defer();
                config.timeout = canceler.promise;
                canceler.resolve();
            }

            return config;
        }
    }
})();

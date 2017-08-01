/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('languageHeaderInterceptor', LanguageHeaderInterceptor);

    /* @ngInject */
    function LanguageHeaderInterceptor($injector) {
        var interceptor = {
            request: request
        }

        return interceptor;

        ////////////////////

        function request(config) {
            var $translate = $injector.get('$translate');
            config.headers['Accept-Language'] = $translate.preferredLanguage();
            return config;
        }
    }
})();

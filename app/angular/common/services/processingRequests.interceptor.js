/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function () {
    'use strict';

    /**
     * Exposes processingRequests attribute on $rootScope to inform that there are some processing requests
    */
    angular
        .module('app.common')
        .service('processingRequestsHttpInterceptor', processingRequestsHttpInterceptor);

    function processingRequestsHttpInterceptor($q, $rootScope) {
        var reqCreations = 0;
        var reqResolutions = 0;

        function updateStatus() {
            $rootScope.isProcessingRequests = reqResolutions < reqCreations;
        }

        return {
            request: function(config) {
                reqCreations++;
                updateStatus();
                return config;
            },
            requestError: function(rejection) {
                reqResolutions++;
                updateStatus();
                return $q.reject(rejection);
            },
            response: function(response) {
                reqResolutions++;
                updateStatus();
                return response;
            },
            responseError: function(rejection) {
                reqResolutions++;
                updateStatus();
                return $q.reject(rejection);
            }
        };
    }
})();

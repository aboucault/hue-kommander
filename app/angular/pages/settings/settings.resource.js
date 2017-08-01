/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.settings')
        .factory('settingsResource', settingsResource);

    /* @ngInject */
    function settingsResource($resource, urls) {
        var resources = {
            settings: urls.rest + 'settings'
        };

        var  service = {
            settings: settings()
        };

        return service;

        // ---- ENTITIES ----

        function settings() {
            return $resource(resources.settings);
        }
    }
})();

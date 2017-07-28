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

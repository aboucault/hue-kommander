(function() {
    'use strict';

    angular
        .module('app.scenes')
        .factory('scenesResource', scenesResource);

    /* @ngInject */
    function scenesResource($resource, urls) {
        var resources = {
            scenes: urls.rest + 'scenes'
        };

        var  service = {
            scenes: scenes()
        };

        return service;

        // ---- ENTITIES ----

        function scenes() {
            return $resource(resources.scenes);
        }
    }
})();

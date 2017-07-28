(function() {
    'use strict';

    angular
        .module('app.lights')
        .factory('lightsResource', lightsResource);

    /* @ngInject */
    function lightsResource($resource, urls) {
        var resources = {
            lights: urls.rest + 'lights'
        };

        var  service = {
            lights: lights()
        };

        return service;

        // ---- ENTITIES ----

        function lights() {
            return $resource(resources.lights);
        }
    }
})();

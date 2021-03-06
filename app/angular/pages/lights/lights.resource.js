/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.lights')
        .factory('lightsResource', lightsResource);

    /* @ngInject */
    function lightsResource($resource, urls) {
        var resources = {
            lights: urls.rest + 'lights',
            state: urls.rest + 'lights/:lightId/state'
        };

        var  service = {
            lights: lights(),
            state: state
        };

        return service;

        // ---- ENTITIES ----

        function lights() {
            return $resource(resources.lights);
        }

        function state() {
            return $resource(resources.state);
        }
    }
})();

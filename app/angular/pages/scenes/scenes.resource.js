/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
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

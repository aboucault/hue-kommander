(function() {
    'use strict';

    angular
        .module('app.lights')
        .factory('lightsService', lightsService);

    /* @ngInject */
    function lightsService($q, $http, LightVO) {
        var service = {
            list: list
        };
        return service;

        // ---- SERVICE(s) ----

        function list() {
            var deferred = $q.defer();
            $http.get('resources/mocks/lights.json').then((response) => {
                var data = response.data.payload.slice(0, response.data.length);
                deferred.resolve(LightVO.fromArray(data));
            });
            return deferred.promise;
        }
    }
})();

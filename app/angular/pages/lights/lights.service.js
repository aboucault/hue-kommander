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

            // Get all lights // username: Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8
            $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights').then(function(result) {
                var data = result.data;
                deferred.resolve(LightVO.fromArray(data));
            }, function(error) {
                console.error(error);
            });


            // $http.get('resources/mocks/lights.json').then((response) => {
            //     var data = response.data.payload.slice(0, response.data.length);
            //     deferred.resolve(LightVO.fromArray(data));
            // });
            return deferred.promise;
        }
    }
})();

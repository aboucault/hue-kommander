(function() {
    'use strict';

    angular
        .module('app.lights')
        .factory('lightsService', lightsService);

    /* @ngInject */
    function lightsService($q, $http, LightVO) {
        var service = {
            list: list,
            toggle: toggle,
            brightness: brightness
        };
        return service;

        // ---- SERVICE(s) ----

        function list() {
            var deferred = $q.defer();

            // Get all lights // username: Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8
            // 'resources/mocks/lights.json'
            $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights').then((response) => {
                var data = response.data;
                deferred.resolve(LightVO.fromArray(data));
            });
            return deferred.promise;
        }

        function toggle(lightId, state) {
            return $http.put('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId + '/state', {on: state});
        }

        function brightness(lightId, bri) {
            return $http.put('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId + '/state', {bri: bri});
        }
    }
})();

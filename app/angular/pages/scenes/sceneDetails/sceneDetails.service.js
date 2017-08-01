/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scenes.scene.details')
        .factory('sceneDetailsService', sceneDetailsService);

    /* @ngInject */
    function sceneDetailsService($q, $http) {
        var service = {
            getScene: getScene
        };
        return service;

        // ---- SERVICE(s) ----

        function getScene(sceneId) {
            var deferred = $q.defer();

            // Get all lights // username: Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8
            $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/scenes/' + sceneId).then((response) => {
                var data = response.data;
                deferred.resolve(data);
            });

            return deferred.promise;

        }
    }
})();

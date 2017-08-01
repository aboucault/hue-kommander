/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scenes')
        .factory('scenesService', scenesService);

    /* @ngInject */
    function scenesService($q, $http, SceneVO) {
        var service = {
            list: list,
            deleteScene: deleteScene,
        };
        return service;

        // ---- SERVICE(s) ----

        function list() {
            var deferred = $q.defer();

            // Get all lights // username: Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8
            // 'resources/mocks/lights.json'
            $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/scenes').then((response) => {
                var data = response.data;
                deferred.resolve(SceneVO.fromArray(data));
            });
            return deferred.promise;
        }

        function deleteScene(sceneId) {
            $http.delete('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/scenes/' + sceneId);
        }



    }
    })();

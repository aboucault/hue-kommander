/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scenes')
        .controller('ScenesController', ScenesController);

    /* @ngInject */
    function ScenesController($mdSidenav, $http, scenesService) {
        var scenesCtrl = this;

        // ---- HELPER(s) ----

        scenesCtrl.refreshItems = function() {
            scenesCtrl.queryPromise = scenesService.list();
            return scenesCtrl.queryPromise.then(results => {
                scenesCtrl.scenes = results;
                scenesCtrl.selectedScene = results[0];
                $mdSidenav('right').toggle();
            });
        };

        function deleteScene(sceneId, index) {
            scenesCtrl.scenes.splice(index, 1);
            scenesService.deleteScene(sceneId);
        }

        // ---- INITIALIZE ----

        function init() {
            scenesCtrl.deleteScene = deleteScene;
            scenesCtrl.refreshItems();
        }
        init();
    }
})();

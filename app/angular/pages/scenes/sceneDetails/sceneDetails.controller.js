/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scenes.scene.details')
        .controller('SceneDetailsController', SceneDetailsController);

    /* @ngInject */
    function SceneDetailsController($mdSidenav, $timeout, sceneId, sceneDetailsService, lightsService) {
        var sceneDetailsCtrl = this;

        // ---- HANDLER(s) ----

        function toggleDetails(light) {
            sceneDetailsCtrl.selectedLight = light;
        }

        // ---- HELPER(s) ----

        sceneDetailsCtrl.refreshItems = function() {
            sceneDetailsCtrl.queryPromise = sceneDetailsService.getScene(sceneDetailsCtrl.sceneId);
            sceneDetailsCtrl.queryPromise.then(results => {
                sceneDetailsCtrl.scene = results;
                return results;
            }).then((scene) => {
                let lights = [];
                for(let i=0; i<scene.lights.length; i++) {
                    let lightVo = {};
                    lightVo = lightsService.getLight(scene.lights[i]).then((light) => {
                        lights.push(light);
                        return light;
                    });
                }
                $timeout(function () {
                    sceneDetailsCtrl.scene.lights = lights;
                    sceneDetailsCtrl.selectedLight = lights[0];
                    $mdSidenav('right').toggle();
                }, 200);
            });
        };

        // ---- INITIALIZE ----

        function init() {
            sceneDetailsCtrl.sceneId = sceneId;
            sceneDetailsCtrl.toggleDetails = toggleDetails;
            sceneDetailsCtrl.refreshItems();
        }
        init();
    }
})();

/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.lights')
        .controller('LightsController', LightsController);

    /* @ngInject */
    function LightsController($timeout, lightsService, util) {
        var lightsCtrl = this;

        // ---- HANDLER(s) ----

        function toggleDetails(light) {
            lightsCtrl.selectedLight = light;
        }

        // ---- HELPER(s) ----

        lightsCtrl.refreshItems = function() {
            lightsCtrl.queryPromise = lightsService.list();
            return lightsCtrl.queryPromise.then(results => {
                lightsCtrl.lights = results;
                if(!lightsCtrl.selectedLight) {
                    lightsCtrl.selectedLight = results[0];
                }
            });
        };

        setInterval(lightsCtrl.refreshItems, 3000);


        // ---- INITIALIZE ----

        function init() {
            lightsCtrl.toggleDetails = toggleDetails;
            lightsCtrl.getDeviceSize = util.getDeviceSize();
            lightsCtrl.refreshItems();
        }
        init();
    }
})();

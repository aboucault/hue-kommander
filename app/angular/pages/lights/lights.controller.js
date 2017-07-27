(function() {
    'use strict';

    angular
        .module('app.lights')
        .controller('LightsController', LightsController);

    /* @ngInject */
    function LightsController($mdSidenav, lightsService) {
        var lightsCtrl = this;

        // ---- HANDLER(s) ----

        function toggleDetails(light) {
            lightsCtrl.selectedLight = light;
            if(!$mdSidenav('right').isOpen()) {
                $mdSidenav('right').toggle();
            }
        }

        function close() {
            $mdSidenav('right').close();
            lightsCtrl.selectedLight = undefined;
        }

        // ---- HELPER(s) ----

        lightsCtrl.refreshItems = function() {
            lightsCtrl.queryPromise = lightsService.list();
            return lightsCtrl.queryPromise.then(results => {
                lightsCtrl.lights = results;
            });
        };

        // ---- INITIALIZE ----
        function init() {
            lightsCtrl.toggleDetails = toggleDetails;
            lightsCtrl.close = close;
            lightsCtrl.refreshItems();
        }
        init();
    }
})();

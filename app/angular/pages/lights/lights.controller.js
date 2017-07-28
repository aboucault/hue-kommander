(function() {
    'use strict';

    angular
        .module('app.lights')
        .controller('LightsController', LightsController);

    /* @ngInject */
    function LightsController($mdSidenav, $http, lightsService) {
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
                lightsCtrl.selectedLight = results[0];
                $mdSidenav('right').toggle();
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

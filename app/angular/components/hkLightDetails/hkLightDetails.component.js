(function() {
    'use strict';

    /*
     * Widget to modify the settings of a given light
     */
    angular
        .module('hk.light.details', [])
        .component('hkLightDetails', {
            templateUrl: 'angular/components/hkLightDetails/hkLightDetails.html',
            controller: HkLightDetailsController,
            controllerAs: 'hkLightDetailsCtrl',
            bindings: {
                light: '<' // the light to modify
            }
        });

    function HkLightDetailsController() {
    }
})();

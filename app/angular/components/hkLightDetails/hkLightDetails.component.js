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

    function HkLightDetailsController(lightsService) {
        var hkLightDetailsCtrl = this;

        hkLightDetailsCtrl.toggleLight = toggleLight;
        hkLightDetailsCtrl.setBrightness = setBrightness;

        function toggleLight() {
            lightsService.toggle(hkLightDetailsCtrl.light.id, !hkLightDetailsCtrl.light.state.on).then((response) => {
                console.log(response);
            });
            hkLightDetailsCtrl.light.state.on = !hkLightDetailsCtrl.light.state.on;
        }

        function setBrightness() {
            lightsService.brightness(hkLightDetailsCtrl.light.id, hkLightDetailsCtrl.light.state.bri).then((response) => {
                console.log(response);
            });
        }
    }
})();

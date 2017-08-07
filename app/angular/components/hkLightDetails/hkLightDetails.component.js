/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    /*
     * Widget to modify the settings of a given light
     */
    angular
        .module('hk.light.details', [])
        .config(function($compileProvider) {
          $compileProvider.preAssignBindingsEnabled(true);
        })
        .component('hkLightDetails', {
            bindings: {
                light: '<' // the light to modify
            },
            controller: HkLightDetailsController,
            controllerAs: 'hkLightDetailsCtrl',
            templateUrl: 'angular/components/hkLightDetails/hkLightDetails.html'
        });

    function HkLightDetailsController(lightsService) {
        var hkLightDetailsCtrl = this;

        hkLightDetailsCtrl.toggleLight = toggleLight;
        hkLightDetailsCtrl.setBrightness = setBrightness;
        hkLightDetailsCtrl.setHueColor = setHueColor;

        // ---- HANDLER(s) ----

        function toggleLight() {
            lightsService.toggle(hkLightDetailsCtrl.light.id, hkLightDetailsCtrl.light.state.on);
        }

        function setBrightness() {
            lightsService.brightness(hkLightDetailsCtrl.light.id, hkLightDetailsCtrl.light.state.bri);
        }

        function setHueColor() {
            let coordinates = lightsService.rgbToCie(convertRgbStringHueValue(hkLightDetailsCtrl.light.state.rgb));
            hkLightDetailsCtrl.light.state.xy = [Number(coordinates[0]), Number(coordinates[1])];
            lightsService.hueColor(hkLightDetailsCtrl.light.id, hkLightDetailsCtrl.light.state.xy);
        }

        // ---- HELPER(s) ----

        function convertRgbStringHueValue(rgbString) {
            return rgbString.substring(rgbString.indexOf('(') +1, rgbString.length -1).split(', ').map(Number);
        }

        function isInTriangle (px,py,ax,ay,bx,by,cx,cy){

            var v0 = [cx-ax,cy-ay];
            var v1 = [bx-ax,by-ay];
            var v2 = [px-ax,py-ay];

            var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
            var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
            var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
            var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
            var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);

            var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

            return ((u >= 0) && (v >= 0) && (u + v < 1));
        }
    }
})();

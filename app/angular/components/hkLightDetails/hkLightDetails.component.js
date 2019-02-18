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

    function HkLightDetailsController($timeout, lightsService, util) {
        var hkLightDetailsCtrl = this;

        // ---- INITIALIZE ----

        hkLightDetailsCtrl.$onInit = () => {
            hkLightDetailsCtrl.toggleLight = toggleLight;
            hkLightDetailsCtrl.getDeviceSize = util.getDeviceSize();
            // intensity
            hkLightDetailsCtrl.setBrightness = setBrightness;
            // colorPicker
            hkLightDetailsCtrl.setHueColor = setHueColor;
            hkLightDetailsCtrl.moveColorPicker = moveColorPicker;
            hkLightDetailsCtrl.colorPickerPosition = '0 0 0 91px';
            hkLightDetailsCtrl.colorPickerOffsetX = 1440;
            hkLightDetailsCtrl.colorPickerOffsetY = 322;
            hkLightDetailsCtrl.activateColorPicker = false;
            // randomMode
            hkLightDetailsCtrl.randomMode = false;
            hkLightDetailsCtrl.activateRandomMode = activateRandomMode;
        };


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

        function moveColorPicker(event) {
            // event is a jquery instance of the mouse inside the color picker knob
            // console.log(event);
            if(hkLightDetailsCtrl.activateColorPicker === true) {
                // get offsetTop and offsetLeft of target - the knob
                // it will be used to change the knob position

                let newOffsetX = event.target.offsetLeft;
                let newOffsetY = event.target.offsetTop;

                // add the value of the current movement
                newOffsetX += event.originalEvent.movementX;
                newOffsetY += event.originalEvent.movementY;
                let coordinates = Math.pow((newOffsetX-1440), 2) + Math.pow((newOffsetY-229.5), 2);

                if( coordinates > Math.pow(92.5, 2) - 200 && coordinates < Math.pow(92.5, 2) + 200 ) {
                    hkLightDetailsCtrl.colorPickerOffsetX = newOffsetX;
                    hkLightDetailsCtrl.colorPickerOffsetY = newOffsetY;
                }

                //
                // define the circle circumference where the knob can slide
                //******* force a radius of 92.5px and find all the possible values for x and y
                // r = (x0-x)² + (y0-y)² // demerden Sie sich
                //
                // Math.pow(92,5) = Math.pow(x-1440) + Math.pow(y-229.5)
                //******* diameter is 185px, 0° is (1440,322), center is (x0,y0) with x0=1440, y0=229.5
                //******* update mouse position using a super complicated math formula
                // x=(ray/2)+(ray/2)*Math.cos(angleRad);
                // y=(ray/2)+(ray/2)*Math.sin(angleRad);

                // hkLightDetailsCtrl.colorPickerOffsetX = 1440 + 92,5 * cosX;
                // hkLightDetailsCtrl.colorPickerOffsetX = 161 + 92,5 * sinY;
                // get the associated color (use hue?) using a degree value
                // hue goes from 0 (red-orange) to 360 (violet-red), it will be easier to use with a circle
            }
        }

        function activateRandomMode() {
            if(hkLightDetailsCtrl.randomMode === true) {
                hkLightDetailsCtrl.light.state.event = 'colorloop';
                hkLightDetailsCtrl.light.state.transitiontime = hkLightDetailsCtrl.light.state.transitiontime ? hkLightDetailsCtrl.light.state.transitiontime : 4;
            } else {
                hkLightDetailsCtrl.light.state.event = 'none';
            }
            lightsService.colorloop(hkLightDetailsCtrl.light.id, hkLightDetailsCtrl.light.state.event, hkLightDetailsCtrl.light.state.transitiontime);
        }

        // ---- HELPER(s) ----

        function convertRgbStringHueValue(rgbString) {
            return rgbString.substring(rgbString.indexOf('(') +1, rgbString.length -1).split(', ').map(Number);
        }
    }
})();

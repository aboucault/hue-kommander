/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.lights')
        .factory('lightsService', lightsService);

    /* @ngInject */
    function lightsService($q, $http, LightVO) {
        var service = {
            list: list,
            getLight: getLight,
            toggle: toggle,
            brightness: brightness,
            hueColor: hueColor,
            ////////////////////
            rgbToCie: rgbToCie
        };
        return service;

        // ---- SERVICE(s) ----

        function list() {
            var deferred = $q.defer();

            // Get all lights // username: Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8
            // 'resources/mocks/lights.json'
            // return lightsResource.state.save({'lightId': lightId}, {on: state});
            $http.get('resources/mocks/lights.json').then((response) => {
                deferred.resolve(LightVO.fromArray(response.data));
            });
            // $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights').then((response) => {
            //     deferred.resolve(LightVO.fromArray(response.data));
            // });
            return deferred.promise;
        }

        function getLight(lightId) {
            return $http.get('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId).then((response) => {
                var light = LightVO.create(response.data);
                light.id = lightId;
                return light;
            });
        }

        function toggle(lightId, state) {
            return $http.put('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId + '/state', {on: state});
        }

        function brightness(lightId, bri) {
            return $http.put('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId + '/state', {bri: bri});
        }

        function hueColor(lightId, cieColorCoordinates) {
            return $http.put('http://192.168.1.56/api/Dg8OPHcaRn6LguYd163xXJf7lD2egT8BCYCk3IY8/lights/' + lightId + '/state', {xy: cieColorCoordinates});
        }

        /////////////////////////

        function rgbToCie(rgbCoord) {

            // convert rgb values to be between 0 and 1
            let r = rgbCoord[0]/255;
            let g = rgbCoord[1]/255;
            let b = rgbCoord[2]/255;

            // Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device. This gamma correction is also applied to the screen of your computer or phone, thus we need this to create a similar color on the light as on screen. This is done by the following formulas:

            r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
            g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
            b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);

            // Convert the RGB values to XYZ using the Wide RGB D65 conversion formula The formulas used:
            let X = r * 0.664511 + g * 0.154324 + b * 0.162028;
            let Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
            let Z = r * 0.000088 + g * 0.072310 + b * 0.986039;

            // Calculate the xy values from the XYZ values
            let x = (X / (X + Y + Z)).toFixed(4);
            let y = (Y / (X + Y + Z)).toFixed(4);

            if (isNaN(x)) { x = 0;}
            if (isNaN(y)) { y = 0;}

            // x & y are the CIE color coordinates, Y is used for the brightness value
            return [x, y, Y];
        }
    }
})();

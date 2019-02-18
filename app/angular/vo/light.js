/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.light', [])
        .factory('LightVO', LightVO);

    /* @ngInject */
    function LightVO() {

        function LightVO(data) {
            var defaults = {
                id: undefined,
                iconname: undefined,
                modelname: undefined,
                uniqueid: undefined,
                name: undefined,
                modelid: undefined,
                state: {
                    alert: undefined,
                    bri: undefined,
                    colormode: undefined,
                    rgb: undefined,
                    ct: undefined,
                    effect: undefined,
                    hue: undefined,
                    reachable: undefined,
                    sat: undefined,
                    xy: [undefined],
                    on: undefined,
                    transitiontime: undefined
                }
            };
            angular.extend(this, defaults, data);
        }

        LightVO.prototype = {
            getTypeIconName: function() {
                var modelid = (this.modelid) ? this.modelid : undefined;
                return getTypeIconName(modelid);
            },
            getModelName: function() {
                var modelid = (this.modelid) ? this.modelid : undefined;
                return getModelName(modelid);
            },
            getRgbValues: function() {
                let xy = (this.state.xy) ? this.state.xy : undefined;
                let bri = (this.state.bri) ? this.state.bri : undefined;
                return getRgbValues(xy, bri);
            }
        };

        // ---- HELPER(s) ----

        LightVO.create = function(item) {
            return new LightVO(item);
        };

        LightVO.fromArray = function(items) {
            if(angular.isArray(items)) {
                return items.map(LightVO.create).filter(Number);
            }
            items = castObjectToArray(items);
            items.slice(0, items.length);
            items.map(LightVO.create).filter(Number);
            return items;
        };

        function castObjectToArray(obj) {
            let list = [];
            for(let key in obj) {
                obj[key].id = key;
                obj[key].state.rgb = getRgbValues(obj[key].state.xy, obj[key].state.bri);
                obj[key].iconname = getTypeIconName(obj[key].modelid);
                obj[key].modelname =  getModelName(obj[key].modelid);
                list.push(obj[key]);
            }
            return list;
        }

        function getTypeIconName(modelid) {
            let model = getModeltype(modelid);
            switch(model) {
                case 'white': return 'lightbulb_outline';
                case 'LCT': return 'wb_incandescent';
                case 'LST': return 'wb_iridescent';
                default: return 'lightbulb_outline';
            }
        }

        function getModelName(modelid) {
            let model = getModeltype(modelid);
            switch (model) {
                case 'LCT': return 'Hue colors';
                case 'LST': return 'Hue lightstrip';
                case 'LLC': return 'Hue bloom';
                default: return 'unknown';
            }
        }

        function getRgbValues(cieCoord, brightness) {
            let light = cieToRgb(cieCoord, brightness);
            return "rgb(" + light[0] + ","+ light[1] + ","+ light[2] + ")";
        }

        function cieToRgb(cieCoord, brightness) {
            let x = cieCoord[0];
            let y = cieCoord[1];
            let z = 1.0 - x - y;
            let Y = brightness/255.0; // The given brightness value
            let X = (Y / y) * x;
            let Z = (Y / y) * z;

            // convert to rgb
            let r =  X * 1.612 - Y * 0.203 - Z * 0.302;
            let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
            let b =  X * 0.026 - Y * 0.072 + Z * 0.962;

            // apply reverse gamma correction
            r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
            g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
            b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
            // rgb values above are between 0 and 1
            let maxValue = Math.max(r,g,b);
            r /= maxValue;
            g /= maxValue;
            b /= maxValue;
            r = r * 255;   if (r < 0) { r = 255; }
            g = g * 255;   if (g < 0) { g = 255; }
            b = b * 255;   if (b < 0) { b = 255; }

            r = Math.round(r); g = Math.round(g); b = Math.round(b);
            return [r, g, b];
        }

        function getModeltype(modelid) {
            return modelid.substring(0, 3);
        }

        return LightVO;
    }
})();

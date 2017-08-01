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
                    on: undefined
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

        function getModeltype(modelid) {
            return modelid.substring(0, 3);
        }

        return LightVO;
    }
})();

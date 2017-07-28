(function() {
    'use strict';

    angular
        .module('app.light', [])
        .factory('LightVO', LightVO);

    /* @ngInject */
    function LightVO() {

        function LightVO(data) {
            var defaults = {
                uniqueid: undefined,
                name: undefined,
                modelid: undefined,
                state: {
                    alert: undefined,
                    bri: undefined,
                    colormode: undefined,
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
        }

        function castObjectToArray(obj) {
            return Object.keys(obj).map(key => obj[key]);
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

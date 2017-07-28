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
            return LightVO.create(items);
        }

        function getTypeIconName(modelid) {
            switch(modelid) {
                case 'white': return 'lightbulb_outline';
                case 'LCT007': return 'wb_incandescent';
                case 'LST001': return 'wb_iridescent';
            }
        }

        return LightVO;
    }
})();

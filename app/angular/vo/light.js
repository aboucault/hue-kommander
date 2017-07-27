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
                name: undefined,
                type: undefined,
                on: undefined,
                reachable: undefined,
                brightness: undefined,
                colorMode: undefined,
                hue: undefined,
                saturation: undefined,
                transitionTime: undefined
            };
            angular.extend(this, defaults, data);
        }

        LightVO.prototype = {
            getTypeIconName: function() {
                var type = (this.type) ? this.type : undefined;
                return getTypeIconName(type);
            }
        };

        // ---- HELPER(s) ----

        LightVO.create = function(item) {
            return new LightVO(item);
        };

        LightVO.fromArray = function(items) {
            if(angular.isArray(items)) {
                return items.map(LightVO.create).filter(Boolean);
            }
            return LightVO.create(items);
        }

        function getTypeIconName(type) {
            switch(type) {
                case 'white': return 'lightbulb_outline';
                case 'color': return 'wb_incandescent';
                case 'lightstrip': return 'wb_iridescent';
            }
        }

        return LightVO;
    }
})();

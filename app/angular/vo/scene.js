/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scene', [])
        .factory('SceneVO', SceneVO);

    /* @ngInject */
    function SceneVO() {

        function SceneVO(data) {
            var defaults = {
                id: undefined,
                name:undefined,
                lights:[undefined],
                owner:undefined,
                recycle:undefined,
                locked:undefined,
                appdata:{undefined},
                picture:undefined,
                lastupdated:undefined,
                version:undefined,
                lightstates:{undefined}
            };
            angular.extend(this, defaults, data);
        }

        SceneVO.prototype = {

        };

        // ---- HELPER(s) ----

        SceneVO.create = function(item) {
            return new SceneVO(item);
        };

        SceneVO.fromArray = function(items) {
            if(angular.isArray(items)) {
                return items.map(SceneVO.create).filter(Number);
            }
            items = castObjectToArray(items);
            items.slice(0, items.length);
            items.map(SceneVO.create).filter(Number);
            return items;
        }

        function castObjectToArray(obj) {
            let list = [];
            for(let key in obj) {
                obj[key].id = key;
                list.push(obj[key]);
            }
            return list;
        }

        return SceneVO;
    }
})();

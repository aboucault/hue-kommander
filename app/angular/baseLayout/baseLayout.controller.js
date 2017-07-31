/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.baseLayout')
        .controller('BaseLayoutController', BaseLayoutController);

    /* @ngInject */
    function BaseLayoutController(navigationMenuService) {
        var baseLayoutCtrl = this;

        baseLayoutCtrl.navigationMenuService = navigationMenuService;
    }
})();

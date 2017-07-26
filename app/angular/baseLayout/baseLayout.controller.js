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

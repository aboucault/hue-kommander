/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('hk.app.bar')
        .directive('hkAppBar', AppBar);

    /* @ngInject */
    function AppBar() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'angular/components/hkAppBar/hkAppBar.html',
            controller: AppBarController,
            controllerAs: 'appBarCtrl',
            bindToController: true
        };

        function AppBarController(hkAppBarService, $state, navigationMenuService) {
            var appBarCtrl = this;

            appBarCtrl.hkAppBarService = hkAppBarService;

            appBarCtrl.getPageTitle = function() {
                if(hkAppBarService.pageTitle !== "") {
                    return hkAppBarService.pageTitle;
                } else {
                    return 'states.' + $state.current.name;
                }
            };

            appBarCtrl.clickBurger = function () {
                navigationMenuService.toggleVisibility();
            };

            appBarCtrl.isMenuOpen = function() {
                return navigationMenuService.isVisible;
            };
        }
    }
})();

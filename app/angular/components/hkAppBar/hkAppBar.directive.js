(function() {
    'use strict';

    angular
        .module('hk.app.bar')
        .controller('hkAppBar', AppBar);

    /* @ngInject */
    function AppBar() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'angular/components/hkAppBar/hkAppBar.directive.html',
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

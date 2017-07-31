/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('hk.navigation.menu')
        .directive('hkNavigationMenu', NavigationMenu);

    /* @ngInject */
    function NavigationMenu(navigationMenuService, $mdColors) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'angular/components/hkNavigationMenu/hkNavigationMenu.html',
            link: function(scope) {
                scope.menu = navigationMenuService;
                console.log(scope.menu.menuItems);
                scope.$mdColors = $mdColors;
                // Automatically show/hide on resize
                window.onresize = _onSizeChange;

                updateMenuVisibility();

                _onSizeChange();
                function _onSizeChange() {
                    updateMenuVisibility();

                    // if(!scope.$$phase) {
                    //     scope.$digest();
                    // }
                }

                function updateMenuVisibility() {
                    if($(window).width() < 1400) {
                        navigationMenuService.setVisible(false);
                    } else {
                        navigationMenuService.setVisible(true);
                    }
                }
            }
        };
    }
})();

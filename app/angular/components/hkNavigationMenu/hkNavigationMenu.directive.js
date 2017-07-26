(function() {
    'use strict';

    angular
        .module('app.components.hk.navigation.menu')
        .controller('hkNavigationMenu', NavigationMenu);

    /* @ngInject */
    function NavigationMenu(navigationMenuService, $mdColors) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'angular/components/hkNavigationMenu/hkNavigationMenu.directive.html',
            link: function(scope) {
                scope.menu = navigationMenuService;
                scope.$mdColors = $mdColors;
                window.onresize = _onSizeChange;

                updateMenuVisibility();

                _onSizeChange();
                function _onSizeChange() {
                    updateMenuVisibility();

                    if(!scope.$$phase) {
                        scope.$digest();
                    }
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

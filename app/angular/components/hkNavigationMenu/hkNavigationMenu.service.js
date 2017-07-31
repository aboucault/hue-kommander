/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    class NavigationMenuProvider {
        constructor() {

            var _menuItems = [];
            this.$get = serviceFn;

            // expose during config
            this.setMenuItems = setMenuItems;

            /* @NgInject */
            function serviceFn($rootScope, $state) {

                var _selectedMenuItem;
                var _visible = true;
                var animationTiming = 250;

                init();

                return {
                    toggleVisibility: toggleVisibility,
                    get isVisible() {
                        return _visible;
                    },
                    setVisible: setVisible,
                    setMenuItems: setMenuItems,
                    get menuItems() {
                        return _menuItems;
                    },
                    get selectedMenuItem() {
                        return _selectedMenuItem;
                    },
                    set selectedMenuItem(value) {
                        _selectedMenuItem = value;
                    },
                    clickOnMenuItem: clickOnMenuItem,
                    restrictView: restrictView
                };

                ////////////////////////

                function toggleVisibility() {
                    _visible = !_visible;
                    setTimeout(() => $rootScope.$broadcast('LAYOUT_CHANGED'), animationTiming);
                }

                function setVisible(value) {
                    _visible = value;
                    setTimeout(() => $rootScope.$broadcast('LAYOUT_CHANGED'), animationTiming);
                }

                function init() {
                    setCurrentMenuItem();
                    setCurrentMenuItemWhenStateChange();
                }

                function setCurrentMenuItemWhenStateChange() {
                    $rootScope.$on('$stateChangeSuccess', () => {
                        setCurrentMenuItem();
                    });
                }

                function setCurrentMenuItem() {
                    var index = _.findIndex(_menuItems, {state: $state.current.name});
                    if(index !== -1) {
                        _selectedMenuItem = _menuItems[index];
                    }
                }

                function clickOnMenuItem(menuItem) {
                    $rootScope.$broadcast('onNavigationMenuItemClick', menuItem);
                    if(menuItem.state) {
                        $state.go(menuItem.state, menuItem.stateParams);
                    }
                }

                function restrictView(value) {
                    let items = _menuItems;
                    items[0].restricted = value;
                    items[1].restricted = value;
                    setMenuItems(items);
                }
            }

            /* Config phase implementation */
            function setMenuItems(menuItems) {
                _menuItems = menuItems;
            }
        }
    }

    angular
        .module('hk.navigation.menu')
        .provider('navigationMenuService', NavigationMenuProvider);
})();

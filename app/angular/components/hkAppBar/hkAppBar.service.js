/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    class HkAppBar {
        constructor($rootScope, $state) {
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.pageTitle = "";
            this.clearTitleOnStateChange();
        }

        ///////////////////

        clearTitleOnStateChange() {
            var self = this;
            this.$rootScope.$on('$stateChangeSuccess', () => {
                self.pageTitle = "";
            });
        }
    }

    HkAppBar.$inject = ['$rootScope', '$state'];

    angular
        .module('hk.app.bar')
        .service('hkAppBarService', HkAppBar);
})();

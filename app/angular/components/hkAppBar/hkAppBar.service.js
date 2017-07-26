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

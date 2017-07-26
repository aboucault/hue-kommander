(function() {
    'use strict';

    angular
        .module('app.baseLayout')
        .config(function($stateProvider) {
            $stateProvider
                .state('baseLayout', {
                    abstract:true,
                    templateUrl: 'angular/baseLayout/baseLayout.html',
                    controller: 'BaseLayoutController',
                    controllerAs: 'baseLayoutCtrl'
                });
        });
})();

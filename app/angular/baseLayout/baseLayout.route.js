/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
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

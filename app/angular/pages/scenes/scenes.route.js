/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.scenes')
        .config(function($stateProvider) {
            $stateProvider
                .state('scenes', {
                    parent: 'baseLayout',
                    url: '/scenes',
                    templateUrl: 'angular/pages/scenes/scenes.html',
                    controller: 'ScenesController',
                    controllerAs: 'scenesCtrl'
                });
        });
})();

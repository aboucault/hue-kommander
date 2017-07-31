/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.lights')
        .config(function($stateProvider) {
            $stateProvider
                .state('lights', {
                    parent: 'baseLayout',
                    url: '/lights',
                    templateUrl: 'angular/pages/lights/lights.html',
                    controller: 'LightsController',
                    controllerAs: 'lightsCtrl'
                });
        });
})();

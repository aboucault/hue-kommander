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

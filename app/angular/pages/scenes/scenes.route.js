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

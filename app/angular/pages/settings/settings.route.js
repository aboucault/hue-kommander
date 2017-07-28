(function() {
    'use strict';

    angular
        .module('app.settings')
        .config(function($stateProvider) {
            $stateProvider
                .state('settings', {
                    parent: 'baseLayout',
                    url: '/settings',
                    templateUrl: 'angular/pages/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'settingsCtrl'
                });
        });
})();

/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
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

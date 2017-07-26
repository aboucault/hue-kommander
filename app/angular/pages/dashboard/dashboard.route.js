(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(function($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    parent: 'baseLayout',
                    url: '/dashboard',
                    templateUrl: 'angular/pages/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl'
                });
        });
})();

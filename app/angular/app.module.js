(function() {
    'use strict';

    // dependencies
    angular.module('app.dependencies', [
        'ngMaterial',
        'ngMessages',
        'ngSanitize',
        'ngResource',
        'angular.filter',
        'ui.router',
        'angular-storage',
        'ngMaterial'
    ]);

    // Core
    angular.module('app', [
        'app.dependencies',
        'app.templates',
        'app.common',
        // 'app.components',
        // 'app.vo',
        'app.baseLayout',
        'app.pages'
    ]);
})();

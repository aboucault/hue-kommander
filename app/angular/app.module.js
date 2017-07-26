(function() {
    'use strict';

    // dependencies
    angular.module('app.dependencies', [
        'ngMaterial',
        'ngMessages',
        'ngSanitize',
        'ngResource',
        'ui.router',
        'angular-storage',
        'ngMaterial',
        'pascalprecht.translate'
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

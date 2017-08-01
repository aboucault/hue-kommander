/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    // dependencies
    angular.module('app.dependencies', [
        'ngMaterial',
        'ngMessages',
        'ngAnimate',
        'ngSanitize',
        'ngResource',
        'ui.router',
        'angular-storage',
        'ngMaterial',
        'pascalprecht.translate',
        'mdColorPicker'
    ]);

    // Core
    angular.module('app', [
        'app.dependencies',
        'app.templates',
        'app.common',
        'app.components',
        'app.vo',
        'app.baseLayout',
        'app.pages'
    ]);
})();

/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function () {
    'use strict';

    angular
        .module('app.common', [
            'app.components',
            'app.common.services.appContext',
            'pascalprecht.translate',
            'ngAnimate',
            'ngSanitize',
            'ui.router',
            'angular-storage'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/common/common.translations');
        });
})();

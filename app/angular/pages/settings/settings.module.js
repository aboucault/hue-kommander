/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function () {
    'use strict';

    angular
        .module('app.settings', [
            'app.dependencies',
            'app.common',
            'app.components',
            'app.vo'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/pages/settings/settings.translations');
        });
})();

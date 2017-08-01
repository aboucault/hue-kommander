/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function () {
    'use strict';

    angular
        .module('app.scenes', [
            'app.dependencies',
            'app.vo',
            'app.common',
            'app.components',
            'app.scenes.scene.details'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/pages/scenes/scenes.translations');
        });
})();

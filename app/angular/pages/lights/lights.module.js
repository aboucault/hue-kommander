(function () {
    'use strict';

    angular
        .module('app.lights', [
            'app.dependencies',
            'app.common',
            'app.components',
            'app.vo'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/pages/lights/lights.translations');
        });
})();

(function () {
    'use strict';

    angular
        .module('app.lights', [
            'app.dependencies',
            'app.components',
            'app.vo'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/pages/lights/lights.translations');
        });
})();

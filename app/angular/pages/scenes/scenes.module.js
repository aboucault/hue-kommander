(function () {
    'use strict';

    angular
        .module('app.scenes', [
            'app.dependencies',
            'app.common',
            'app.components',
            'app.vo'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/pages/scenes/scenes.translations');
        });
})();

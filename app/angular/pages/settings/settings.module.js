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

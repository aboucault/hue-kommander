(function () {
    'use strict';

    angular
        .module('app.common', [
            'app.common.services.appContext'
        ])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/common/common.translations');
        });
})();

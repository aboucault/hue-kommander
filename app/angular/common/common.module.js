(function () {
    'use strict';

    angular
        .module('app.common', [
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

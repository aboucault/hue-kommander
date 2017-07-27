(function () {
    'use strict';

    angular
        .module('app.common', [])
        .config(function($translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('angular/common/common.translations');
        });
})();

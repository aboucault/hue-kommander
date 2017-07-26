(function () {
    'use strict';

    angular.module('app');

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['app']);
        });
    }

    bootstrapApplication();    
})();

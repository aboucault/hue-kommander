/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
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

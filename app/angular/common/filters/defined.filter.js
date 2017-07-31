/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    angular
        .module('app.common')
        .filter('defined', defined);

    function defined() {
        return function(input) {
            return (angular.isDefined(input) && (input !== null)) ? input : '-';
        }
    }
})();

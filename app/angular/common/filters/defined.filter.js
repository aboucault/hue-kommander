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

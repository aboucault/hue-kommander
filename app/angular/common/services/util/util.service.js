(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('util', function() {
            var util = {
                sanitize,
                getLanguages: () => window.navigator.languages,
                getLanguage: () => window.navigator.language
            };

            return util;

            ///////////////////////

            function sanitize(task) {
                //angular.copy strips out angular properties
                task = angular.copy(task);
                for(var property in task) {
                    if(_.startsWith(property, '_')) { // jshint ignore:line
                        delete task[property];
                    }
                }
            }
        });
})();

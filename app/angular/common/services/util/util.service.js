(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('util', function() {
            var util = {
                sanitize,
                copyToClipBoard,
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

            function copyToClipBoard(text) {
                var textArea = document.createElement("textArea");

                // Place in top-left corner of screen regardless of scroll position
                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;

                // Ensure it has a small width and height. Setting to 1px / 1em
                // doesn't work as this gives a negative w/h on some browsers
                textArea.style.width = '2em';
                textArea.style.height = '2em';

                // We don't need padding, reducing the size if it does flash render
                textArea.style.padding = 0;

                // Clean up any border
                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';

                // Avoid flash of white box if rendered for any reason
                textArea.style.background = 'transparent';

                textArea.value = text;

                document.body.appendChild(textArea);

                textArea.select();

                try {
                    document.execCommand('copy');
                } catch(err) {
                    console.error('Oops, unable to copy');
                }

                document.body.removeChild(textArea);
            }
        });
})();

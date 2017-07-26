'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Template handling
            ngtemplates: {
                app: {
                    options: {
                        module: 'app.templates',
                        standalone: true
                    },
                    cwd: '<%= paths.app %>',
                    src: '**/*.html',
                    dest: '.tmp/<%= paths.app %>/angular/app.templates.js'
                }
            }
        }
    };
};

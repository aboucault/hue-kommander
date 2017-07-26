'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            concat: {
                app: {
                    files: [{
                        dest: '<%= paths.dist %>/app/<%= app.name %>.js',
                        src: [
                            '.tmp/app/angular/**/*.module.js',
                            '.tmp/app/angular/app.templates.js',
                            '.tmp/app/angular/**/*.js',
                            '.tmp/app/angular/**/*.spec.js'
                        ]
                    }]
                }
            }
        }
    };
};

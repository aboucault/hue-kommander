'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            concat: {
                app: {
                    files: [{
                        dest: '<%= paths.dist %>/app/<%= app.name %>.js',
                        src: [
                            '<%= paths.tmp %>/app/angular/app.js',
                            '<%= paths.tmp %>/app/angular/app.templates.js',
                            '<%= paths.tmp %>/app/angular/**/*.module.js',
                            '<%= paths.tmp %>/app/angular/**/*.js',
                            '!<%= paths.tmp %>/app/angular/**/*.spec.js'
                        ]
                    }]
                }
            }
        }
    };
};

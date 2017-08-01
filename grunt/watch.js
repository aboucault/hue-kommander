'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Watches files for changes and runs tasks based on the changed files
            watch: {
                options: {
                    spawn: false // don not spawn tasks to speed up execution process
                },

                templates: {
                    files: ['<%= paths.app %>/angular/**/*.html'],
                    tasks: ['ngtemplates'],
                    options: {
                        event: ['added', 'changed', 'deleted']
                    }
                },

                sass: {
                    files: ['<%= paths.app %>/angular/**/*.scss'],
                    tasks: ['sass:app']
                },

                // injectJS: {
                //     files: ['<%= paths.app %>/angular/**/*.js'],
                //     tasks: ['injector'],
                //     options: {
                //         event: ['added', 'deleted']
                //     }
                // },

                // testJS: {
                //     files: ['<%= paths.app %>/angular/**/*.js'],
                //     tasks: ['karma'],
                //     options: {
                //         event: ['changed']
                //     }
                // },

                babel: {
                    files: ['<%= paths.app %>/angular/**/*.js'],
                    tasks: ['newer:babel:app']
                },

                livereload: {
                    files: [
                        '<%= paths.tmp %>/app/{,*/}*.css',
                        '<%= paths.tmp %>/app/angular/app.templates.js',
                    ],
                    options: {
                        livereload: true
                    }
                }
            }
        }
    };
};

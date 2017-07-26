'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Compiles Sass to CSS and generates necessary files if requested
            sass: {
                app: {
                    options: {
                        sourceMap: true,
                        includePaths: [
                            'bower_components'
                        ]
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= paths.app %>/angular',
                        src: ['*.scss'],
                        dest: '.tmp/app',
                        ext: '.css'
                    }]
                },

                dist: {
                    options: {
                        sourceMap: false,
                        includePaths: [
                            'bower_components'
                        ]
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= paths.app %>/angular',
                        src: ['*.scss'],
                        dest: '.tmp/app',
                        ext: '.css'
                    }]
                }
            }
        }
    };
};

'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Let you write in JavaScript ES6, transpile it to crossbrowser ES5
            babel: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },


                app: {
                    options: {
                        sourceMap: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= paths.app %>',
                        src: [
                            'angular/**/*.js',
                            '!angular/app.templates.js'
                        ],
                        dest: '<%= paths.tmp %>/app'
                    }]
                },
                test: {
                    options: {
                        sourceMap: true,
                        plugins: ['istanbul']
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= paths.app %>',
                        src: ['angular/**/*.js'],
                        dest: '<%= paths.tmp %>/app'
                    }]
                }
            }
        }
    };
};

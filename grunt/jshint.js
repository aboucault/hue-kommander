'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Make sure there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/spec/{,*/}*.js']
                }
            }
        }
    };
};

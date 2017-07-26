'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Copies remaining files to places other tasks can use
            copy: {
                disableDebugInfo: {
                    src: '<%= paths.app %>/angular/app.config.js',
                    dest: '<%= paths.app %>/angular/app.config.js',
                    options: {
                        process: function(content) {
                            return content.replace('disableDebugInfo(true)', 'disableDebugInfo(false)');
                        }
                    }
                },

                vendor: {
                    expand: true,
                    cwd: '<% paths.app %>',
                    dest: '.tmp/app',
                    src: ['vendor/**/*']
                },

                dist: {
                    expand: true,
                    dot: true,
                    cwd: '<% paths.app %>',
                    dest: '<% paths.dist %>/app',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'resources/**',
                        'angular/**/*.json'
                    ]
                }
            }
        }
    };
};

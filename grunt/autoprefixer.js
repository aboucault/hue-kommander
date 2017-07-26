'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Add vendor prefixed styles
            autoprefixer: {
                options: {
                    browsers: ['last 2 versions', 'ff 16', 'ie 10'],
                    safe: true
                },
                app: {
                    options: {
                        map: true
                    },
                    files: [{
                        expand: true,
                        cwd: '.tmp',
                        src: '{,*/}*.css',
                        dest: '.tmp'
                    }]
                },
                dist: {
                    options: {
                        map: false
                    },
                    files: [{
                        expand: true,
                        cwd: '.tmp',
                        src: '{,*/}*.css',
                        dest: '.tmp'
                    }]
                }
            }
        }
    };
};

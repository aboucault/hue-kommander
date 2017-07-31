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
                        cwd: '<%= paths.tmp %>',
                        src: '{,*/}*.css',
                        dest: '<%= paths.tmp %>'
                    }]
                },
                dist: {
                    options: {
                        map: false
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= paths.tmp %>',
                        src: '{,*/}*.css',
                        dest: '<%= paths.tmp %>'
                    }]
                }
            }
        }
    };
};

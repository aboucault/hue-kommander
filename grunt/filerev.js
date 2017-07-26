'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Renames files for browser caching purposes
            filerev: {
                dist: {
                    src: [
                        '<%= paths.dist %>/app/{,*/}*.js',
                        '<%= paths.dist %>/app/{,*/}*.css'
                    ]
                }
            }
        }
    };
};

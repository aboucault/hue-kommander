'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Run some tasks in parallel to speed up the build process
            clean: {
                tmp: {
                    files: [{
                        dot: true,
                        src: [ '<%= paths.tmp %>' ]
                    }]
                },
                dist: {
                    files: [{
                        dot: true,
                        src: [ '<%= paths.dist %>' ]
                    }]
                }
            }
        }
    };
};

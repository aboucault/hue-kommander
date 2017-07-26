'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Run some tasks in parallel to speed up the build process
            clean: {
                tmp: '.tmp',
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= paths.dist %>/{,*/}*',
                            '!<%= paths.dist %>/.git{,*/}*'
                        ]
                    }]
                }
            }
        }
    };
};

'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Run some tasks in parallel to speed up the build process
            concurrent: {
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                },
                watch: [
                    'watch:templates',
                    'watch:sass',
                    'watch:livereload',
                    'watch:babel',
                ],
                watchES6: [
                    'watch:templates',
                    'watch:sass',
                    'watch:livereload'
                ]
            }
        }
    };
};

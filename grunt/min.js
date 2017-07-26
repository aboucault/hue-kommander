'use strict';
var path = require('path');

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Reads HTML for usemin blocks to enable smart builds that automatically
            // concat, minify and revision files. Creates configurations in memory so
            // additional tasks can operate on them
            useminPrepare: {
                options: {
                    flow: {
                        html: {
                            post: {
                                js: [{
                                    name: 'concat',
                                    createConfig: function (context, block) {
                                        if( block.dest === 'script/vendor.js') {
                                            var files = context.inFiles;
                                            files.push(options.paths.dist + '/lib/' + options.lib.name + '.js');
                                            return {
                                                generated: {
                                                    files: [{
                                                        dest: options.path.tmp + '/concat/scripts/vendor.js',
                                                        src: files
                                                    }]
                                                }
                                            };
                                        }
                                    }
                                }]
                            }
                        }
                    }
                }
            }
        }
    };
};

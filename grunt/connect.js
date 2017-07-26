'use strict'

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt, options) {
    return {
        tasks :{
            // The actual grunt server settings
            connect: {
                options: {
                    port: 9000,
                    // TODO Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: true
                },
                livereload: {
                    options: {
                        open: true,
                        middleware: function (connect) {
                            return [
                                connect.static('.tmp/app'),
                                connect().use('/bower_components', connect.static('./bower_components')),
                                connect.static(options.paths.app),
                                proxySnippet
                            ];
                        }
                    }
                },

                test: {
                    options: {
                        port: 9001,
                        middleware: function (connect) {
                            return [
                                connect.static('.tmp'),
                                connect.static('test'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static(options.paths.app),
                            ];
                        }
                    }
                },
                dist: {
                    options: {
                        open: true,
                        middleware: function (connect) {
                            return [
                                connect.static('dist/app'),
                                proxySnippet
                            ];
                        }
                    }
                }
            }
        }
    };
};

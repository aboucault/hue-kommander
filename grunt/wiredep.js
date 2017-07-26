'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Automatically inject Bower components into the app
            wiredep: {
                options: {
                    cwd: '.',
                    overrides: {
                        'ag-grid': {
                            main: 'dist/ag-grid.js'
                        },
                        'angular-material': {
                            main: [
                                'angular-material.js',
                                'angular-material.scss'
                            ]
                        }
                    }
                },

                app: {
                    src: ['<%= paths.app %>/index.html'],
                    ignorePath: /\.\.\//
                },

                test: {
                    devDependencies: true,
                    src: './karma.conf.js',
                    ignorePath: /\.\.\//,
                    fileTypes: {
                        js: {
                            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
                },

                testRunner: {
                    devDependencies: true,
                    src: ['test/runner/index.html']
                },

                sass: {
                    src: ['<%= paths.app %>/angular/{,*/}*.{scss,sass}']
                }



            }
        }
    };
};

'use strict'

module.exports = function(grunt, options) {
    var addLineBreakCRLF = function() {
        return String.fromCharCode(13) + '\r\n';
    };

    return {
        tasks :{
            // Compiles Sass to CSS and generates necessary files if requested
            usebanner: {
                options: {
                    banner: '/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.' + addLineBreakCRLF() + 'This softaware is subject to copyright protection under the laws of France and other countries.' + addLineBreakCRLF() +  'ALL RIGHTS RESERVED.*/' + addLineBreakCRLF() + String.fromCharCode(13),
                    position: 'replace',
                    linebreak: false
                },
                app: {
                    files: {
                        src: ['<%= paths.app %>/angular/**/*.js']
                    }
                },
                dist: {
                    files: {
                        src: ['<%= paths.dist %>/app/app.js']
                    }
                }
            }
        }
    };
};

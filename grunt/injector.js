'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Inject application script files into index.html (doesn't include bower)
            injector: {
                options: {
                    lineEnding: grunt.util.linefeed
                },

                app: {
                    options: {
                        transfom: function (filePath) {
                            filePath = filePath.replace('/.tmp/app/', '');
                            return '<script src="' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:js -->',
                        endtage: '<!-- endinjector -->'
                    },
                    files: {
                        '<%= paths.app %>/index.html': [
                            '<%= paths.app %>/angular/app.module.js',
                            '<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.app %>/angular/**/*.js',
                            '!<%= paths.app %>/angular/**/*.spec.js',
                            '!<%= paths.app %>/angular/**/*.mock.js'
                        ]
                    }
                },

                appES6: {
                    options: {
                        transfom: function (filePath) {
                            filePath = filePath.replace('.tmp/', '');
                            filePath = filePath.replace('app/', '');
                            return '<script src="' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:js -->',
                        endtage: '<!-- endinjector -->'
                    },
                    files: {
                        '<%= paths.app %>/index.html': [
                            '<%= paths.app %>/angular/app.module.js',
                            '<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.app %>/angular/**/*.js',
                            '!<%= paths.app %>/angular/**/*.spec.js',
                            '!<%= paths.app %>/angular/**/*.mock.js'
                        ]
                    }
                },

                test: {
                    options: {
                        transfom: function (filePath) {
                            filePath = filePath.replace('/.tmp/', '.tmp/');
                            return "'" + filePath + "',";
                        },
                        starttag: '// injector:js',
                        endtage: '// endinjector'
                    },
                    files: {
                        'karma.conf.js': [
                            '<%= paths.app %>/angular/app.module.js',
                            '<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.app %>/angular/**/*.js',
                            '<%= paths.app %>/angular/**/*.spec.js',
                            '<%= paths.app %>/angular/**/*.mock.js',
                            '!<%= paths.app %>/angular/**/app.boot.js'
                        ]
                    }
                },

                testRunner: {
                    options: {
                        transfom: function (filePath) {
                            return '<script src="../..' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:specs -->',
                        endtage: '<!-- endinjector -->'
                    },
                    files: {
                        './test/runner/index.html': [
                            '<%= paths.app %>/angular/app.module.js',
                            '<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.app %>/angular/**/*.js',
                            '<%= paths.app %>/angular/**/*.spec.js',
                            '<%= paths.app %>/angular/**/*.mock.js',
                            '!<%= paths.app %>/angular/**/app.boot.js'
                        ]
                    }
                },

                testRunnerSpecs: {
                    options: {
                        transfom: function (filePath) {
                            return '<script src="../..' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:specs -->',
                        endtage: '<!-- endinjector -->'
                    },
                    files: {
                        './test/runner/index.html': ['<%= paths.app %>/angular/**/*.spec.js']
                    }
                }
            }
        }
    };
};

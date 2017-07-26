'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Inject application script files into index.html (doesn't include bower)
            injector: {
                app: {
                    options: {
                        transform: function (filePath) {
                            filePath = filePath.replace('/.tmp/app/', '');
                            return '<script src="' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:js -->',
                        endtag: '<!-- endinjector -->'
                    },
                    files: {
                        '<%= paths.app %>/index.html': [
                            '<%= paths.tmp %>/<%= paths.app %>/angular/*.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.js',
                            '!<%= paths.tmp %>/<%= paths.app %>/angular/**/*.spec.js',
                            '!<%= paths.tmp %>/<%= paths.app %>/angular/**/*.mock.js'
                        ]
                    }
                },

                appES6: {
                    options: {
                        transform: function (filePath) {
                            filePath = filePath.replace('/.tmp/app/', '');
                            filePath = filePath.replace('/app', '');
                            return '<script src="' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:js -->',
                        endtag: '<!-- endinjector -->'
                    },
                    files: {
                        '<%= paths.app %>/index.html': [
                            '<%= paths.app %>/angular/app.module.js',
                            '<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.app %>/angular/**/*.js',
                            '!<%= paths.app %>/angular/**/*.spec.js',
                            '!<%= paths.app %>/angular/**/*.mock.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/app.module.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.js',
                            '!<%= paths.tmp %>/<%= paths.app %>/angular/**/*.spec.js',
                            '!<%= paths.tmp %>/<%= paths.app %>/angular/**/*.mock.js'
                        ]
                    }
                },

                test: {
                    options: {
                        transform: function (filePath) {
                            filePath = filePath.replace('/.tmp/', '.tmp/');
                            return "'" + filePath + "',";
                        },
                        starttag: '// injector:js',
                        endtag: '// endinjector'
                    },
                    files: {
                        'karma.conf.js': [
                            '<%= paths.tmp %>/<%= paths.app %>/angular/app.module.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/app.templates.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.module.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.spec.js',
                            '<%= paths.tmp %>/<%= paths.app %>/angular/**/*.mock.js',
                            '!<%= paths.tmp %>/<%= paths.app %>/angular/**/app.boot.js'
                        ]
                    }
                },

                testRunner: {
                    options: {
                        transform: function (filePath) {
                            return '<script src="../..' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:specs -->',
                        endtag: '<!-- endinjector -->'
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
                        transform: function (filePath) {
                            return '<script src="../..' + filePath + '"></script>';
                        },
                        starttag: '<!-- injector:specs -->',
                        endtag: '<!-- endinjector -->'
                    },
                    files: {
                        './test/runner/index.html': ['<%= paths.app %>/angular/**/*.spec.js']
                    }
                }
            }
        }
    };
};

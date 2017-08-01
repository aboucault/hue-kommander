'use strict'

var path = require('path');

module.exports = function(grunt, options) {
    grunt.injectorConfig = function(task) {
        var _starttag = (task.transformType === 'JS') ? '// injector:js' : '<! -- injector:js -->';
        var _endtag = (task.transformType === 'JS') ? '// endinjector' : '<! -- endinjector -->';
        var _files = task.src.map(function(src) {
            if(src.substr(-3) === ".js") {
                return [src];
            }

            var specs = path.join(src, '**/*.spec.js');
            var files = [
                path.join(src, 'app.js'),
                path.join(src, '**/*.module.js'),
                path.join(src, '**/*.js'),
                (task.includeSpecs) ? specs : '!'+specs
            ];
            if(task.includeSpecs || task.noBoot) {
                files.push('!' + path.join(src, '**/**/app.boot.js'));
            }
            return files;
        });

        return {
            options: {
                transform: task.transform,
                starttag: _starttag,
                endtag: _endtag
            },
            files: {
                [task.dest]: _files
            }
        };
    };

    return {
        tasks :{
            // Inject application script files into index.html (doesn't include bower)
            injector: {
                app: grunt.injectorConfig({
                    transformType: 'HTML',
                    transform: function(filePath) {
                        filePath = filePath.replace('/.tmp/app/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    src: ['<%= paths.tmp %>/app'],
                    dest: '<%= paths.app %>/index.html'
                }),

                appES6: grunt.injectorConfig({
                    transformType: 'HTML',
                    transform: function(filePath) {
                        filePath = filePath.replace('/app', '');
                        filePath = filePath.replace('/.tmp/app/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    src: ['<%= paths.app %>/vendor', '<%= paths.tmp %>/app/angular', '<%= paths.app %>/angular'],
                    dest: '<%= paths.app %>/index.html'
                }),

                test: grunt.injectorConfig({
                    transformType: 'JS',
                    includeSpecs: true,
                    transform: function(filePath) {
                        filePath = filePath.replace('/.tmp/', '.tmp/');
                        return '<script src="' + filePath + '"></script>';
                    },
                    src: ['<%= paths.tmp %>/app'],
                    dest: 'karma.conf.js'
                }),

                testRunner: grunt.injectorConfig({
                    transformType: 'HTML',
                    includeSpecs: false,
                    noBoot: true,
                    transform: function(filePath) {
                        return '<script src="' + filePath + '"></script>';
                    },
                    src: ['<%= paths.app %>/angular', '<%= paths.tmp %>/**/*.templates.js'],
                    dest: 'test/runner/index.html'
                }),

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

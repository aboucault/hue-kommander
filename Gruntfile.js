// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
'use strict';

var packageJson = require('./package.json');

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        configureProxies: 'grunt-connect-proxy',
        useminPrepare: 'grunt-usemin',
        configureApimock: 'grunt-connect-apimock',
        ngtemplates: 'grunt-angular-templates',
        usebanner: 'grunt-banner'
    });

    // Default options
    var options = {
        config: {
            src: 'grunt/*.js'
        },
        version: packageJson.version,
        paths: {
            app: packageJson.appPath || 'app',
            dist: 'dist',
            tmp: '.tmp'
        },
        minify: (grunt.option('minify') !== undefined) ? grunt.option('minify') : true
        // proxies: [{ TODO
        //     context: '/HueKommanderWeb',
        //     host: 'serverName',
        //     port: 12345,
        //     https: false,
        //     changeOrigin: true
        // }]
    };

    // Define the configuration for every task
    var configs = require('load-grunt-configs')(grunt, options);
    grunt.initConfig(configs);

    grunt.registerTask('serve', 'Start a webserver with ./app', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'usebanner:app',
            'clean:tmp',
            'ngtemplates:app',
            'babel:app',
            'injector:app',
            'sass:app',
            'autoprefixer:app',
            'connect:livereload',
            'configureProxies',
            // 'testRunner',
            'concurrent:watch'
        ]);
    });

    grunt.registerTask('serve-ES6', 'Start a webserver without babel transpilation', function (target) {
        grunt.task.run([
            'usebanner:app',
            'clean:tmp',
            'ngtemplates:app',
            'injector:appES6',
            'sass:app',
            'autoprefixer:app',
            'connect:livereload',
            'configureProxies',
            'concurrent:watchES6'
        ]);
    });

    grunt.registerTask('testRunner', [
        'injector:testRunner',
        'injector:testRunnerSpecs',
    ]);

    grunt.registerTask('test', [
        'clean:tmp',
        'ngtemplates:app',
        'babel:test',
        'injector:test',
        'testRunner',
        'karma'
    ]);

    grunt.registerTask('build', 'Build dependencies', function(target) {
        grunt.task.run(['clean:dist', 'clean:tmp']);

        var buildApp = function() {
            grunt.task.run([
                'gitinfo',
                'copy:disableDebugInfo',
                'copy:dist',
                'ngtemplates:app',
                'babel:app',
                'injector:app',
                'sass:dist',
                'autoprefixer:dist',
                'useminPrepare',
                //'concat:app', // TODO concat:app or concat ?
                'ngAnnotate',
                'cssmin',
                'uglify',
                'filerev:dist',
                'usemin'
            ]);
        };

        switch(target) {
            case 'app':
            buildApp();
            break;
            default:
            buildApp();
            break;
        }
    });
};

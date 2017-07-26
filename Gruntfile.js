// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
'use strict';

var packageJson = require('./package.json');
var bowerJson = require('./bower.json');

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        configureProxies: 'grunt-connect-proxy',
        useminPrepare: 'grunt-usemin',
        configureApimock: 'grunt-connect-apimock',
        ngtemplates: 'grunt-angular-templates'
    });

    // Default options
    var options = {
        config: {
            src: 'grunt/*.js'
        },
        gitinfo: {},
        version: packageJson.version,
        paths: {
            app: bowerJson.appPath || 'app',
            dist: 'dist',
            tmp: '.tmp'
        }
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
            'clean:tmp',
            'gitinfo',
            'ngtemplates:app',
            'babel:app',
            'injector:app',
            'wiredep:app',
            'wiredep:sass',
            'sass:app',
            'autoprefixer:app',
            'connect:livereload',
            'configureProxies',
            // 'testRunner',
            'concurrent:watch'
        ]);
    });

    grunt.registerTask('serve-ES6', 'Start a webserver without babel transpilation', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies', 'configureApimock', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:tmp',
            'gitinfo',
            'ngtemplates:app',
            'injector:appES6',
            'wiredep:app',
            'wiredep:sass',
            'sass:app',
            'autoprefixer:app',
            'connect:livereload',
            'configureProxies',
            // 'testRunner',
            'concurrent:watchES6'
        ]);
    });

    grunt.registerTask('testRunner', [
        'injector:testRunner',
        'injector:testRunnerSpecs',
        'wiredep:testRunner'
    ]);

    grunt.registerTask('test', [
        'clean:tmp',
        'ngtemplates:app',
        'babel:test',
        'injector:test',
        'wiredep:test',
        'testRunner',
        'karma'
    ]);

    grunt.registerTask('build', 'Build dependencies', function(target) {
        grunt.task.run(['clean:dist', 'clean:tmp']);

        var buildApp = function() {
            grunt.task.run([
                'gitinfo',
                'copy:disableDebugInfo',
                'copyDist',
                'copy:distApp',
                'ngtemplates:app',
                'babel:app',
                'injector:app',
                'wiredep:app',
                'sass:dist',
                'autoprefixer:dist',
                'useminPrepare',
                'concat:app', // TODO concat:app or concat ?
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

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);
};

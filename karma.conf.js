// Karma configuration

module.exports= function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever anyfile changes
        autoWatch: false,

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browsers
        files: [
            // bower:js
            // endbower

            // injector:js
            // endinjector
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9998,

        // Start these browsers, currently available: Chrome, Safari, PhantomJs, IE
        browsers: [
            'PhantomJS'
            // 'Chrome'
        ],

        // Which plugin to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-coverage'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            '.tmp/app/**/!(*spec|*mock|*templates).js': ['sourcemap']
        },

        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'},
                {type: 'lcovonly', subdir: '.', file: 'lcov.info'},
            ]
        },

        // Continuous integration mode
        // if true, it captures browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //     '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflict with the site root
        // urlRoot: '_karma_'
    });
};

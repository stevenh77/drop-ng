// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [

            // vendor
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/drop/drop.min.js',

            // source
            './src/drop-ng.js',

            // tests
            './tests/unit/*.spec.js',

            // css
            './bower_components/drop/css/drop-theme-arrows-bounce.css',
            './bower_components/drop/css/drop-theme-arrows-bounce-dark.css',
    ],

    // list of files to exclude
    exclude: [

    ],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    //browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};

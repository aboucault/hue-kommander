'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            karma: {
                unit: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            }
        }
    };
};

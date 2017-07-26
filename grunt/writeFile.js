'use strict'

module.exports = function(grunt, options) {
    return {
        tasks :{
            // Write content in file
            writeFile: {
                distLib: {
                    files: [{
                        dest: '<%= paths.dist %>/lib/bower.json',
                        content: function() {
                            var packageJson = grunt.file.readJSON('package.json');
                            var bowerJson = grunt.file.readJSON('bower.json');
                            bowerJson.name = options.lib.name;
                            bowerJson.version = options.lib.version;
                            bowerJson.description = options.lib.description;
                            bowerJson.main = options.lib.bowerMain;
                            return bowerJson;
                        }
                    }]
                }
            }
        }
    };
};

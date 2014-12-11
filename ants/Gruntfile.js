module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                browser: true,
                devel: true,
                eqeqeq: true,
                camelcase: true,
                curly: true,
                indent: 4,
                noempty: true,
                undef: true,
                unused: true,
                globals: {
                  _: true,
                  Point: true,
                  Line: true,
                  Rectangle: true,
                  Ant: true,
                  Arena: true,
                  describe: true,
                  expect: true,
                  it: true,
                  angular: true
                }
            },
            file: [
                'app/**/*.js',
                'tests/**/*.js'
            ]
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'karma']);
    grunt.registerTask('spec', ['karma']);

};

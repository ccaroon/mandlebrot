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
              Arena: true
            }
        },
        file: ['lib/*.js']
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};

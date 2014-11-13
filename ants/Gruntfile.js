module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
        options: {
            browser: true,
            eqeqeq: true,
            camelcase: true,
            curly: true,
            indent: 4,
            noempty: true,
            undef: true,
            unused: true
        },
        file: ['lib/*.js']
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};

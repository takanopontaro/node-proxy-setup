module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-exec'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-este-watch'

  grunt.initConfig
    exec:
      ctags:
        command: 'ctags -e -R --fields=+afikKlmnsSzt --languages=coffee'
        cwd: './lib'
        stdout: true
        stderr: true

    coffee:
      compile:
        options:
          bare: true
          sourceMap: true

    esteWatch:
      options:
        dirs: ['./lib/**/', './tmp/**/', './spec/**/', './bin/**/']
        livereload:
          enabled: false

      coffee: (filepath) ->
        files = [
          expand: true
          src: filepath
          ext: '.js'
        ]
        grunt.config ['coffee', 'compile', 'files'], files
        ['coffee:compile', 'exec:ctags']

  grunt.registerTask 'default', ['exec:ctags', 'esteWatch']

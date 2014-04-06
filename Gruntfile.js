module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-auth.json'),

    watch: {  
      compass: {
        files: ['www/sass/**/*.scss'],
        tasks: ['compass:compile']
      },
      requirejs: {
        files: ['www/js/**/*.js', '!www/js/compiled/**/*.js'],
        tasks: ['requirejs:compile', 'jshint']
      }
    },

    jshint: {
      files: ['www/js/**/*.js'],
      options: {
        ignores: ['www/js/vendor/**/*.js', 'www/js/app-built.js']
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'www/js',
          paths : {
            jquery: 'vendor/jquery-2.0.3.min'
          },
          shim: {
            'vendor/screenfull': {
                exports: 'screenfull'
            } 
          },
          name: 'app',
          out: 'www/js/app-built.js'
        }
      }
    },

    compass: {
      compile: {
        options: {
          config: 'compass-config.rb'
        }
      }
    },

    s3: {
      debug: true,
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        gzip: false, // Override in production
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          'Cache-Control': 'max-age=630720000, public',
          'Expires': new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      cleanup: {
        del: [
          {
            src: '/**/*.*'
          }
        ]
      },
      debug: {
        upload: [
          {
            'src': 'www/index.html',
            'dest': 'islandcx/index.html'
          },
          {
            'src': 'www/css/*.*',
            'dest': 'islandcx/css/'
          },
          {
            'src': 'www/js/fonts/*.*',
            'dest': 'islandcx/js/fonts/'
          },
          {
            'src': 'www/js/themes/*.*',
            'dest': 'islandcx/js/themes/'
          },
          {
            'src': 'www/js/sections/*.*',
            'dest': 'islandcx/js/sections/'
          },
          {
            'src': 'www/js/stage/*.*',
            'dest': 'islandcx/js/stage/'
          },
          {
            'src': 'www/js/*.*',
            'dest': 'islandcx/js/'
          },
          {
            'src': 'www/js/**/*.*',
            'dest': 'islandcx/js/**/'
          },
          {
            'src': 'www/js/vendor/*.*',
            'dest': 'islandcx/js/vendor/'
          },
          {
            'src': 'www/images/*.*',
            'dest': 'islandcx/images/'
          },
          {
            'src': 'www/fonts/*.*',
            'dest': 'islandcx/fonts/'
          }
        ]
      },
      production: {
        options: {
          'gzip': true
        },
        upload: [
          {
            'src': 'www/index.html',
            'dest': 'index.html'
          },
          {
            'src': 'www/css/*.*',
            'dest': 'css/'
          },
          {
            'src': 'www/js/app-built.js',
            'dest': 'js/app-built.js'
          },
          {
            'src': 'www/js/vendor/*.*',
            'dest': 'js/vendor/'
          },
          {
            'src': 'www/images/*.*',
            'dest': 'images/'
          },
          {
            'src': 'www/fonts/*.*',
            'dest': 'fonts/'
          }
        ]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask(
    'default',
    ['jshint', 'requirejs', 'compass']
  );
};
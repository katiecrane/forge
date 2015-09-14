/* eslint-disable */
"use strict";

var webpack = require('webpack');

module.exports = function(grunt) {
  // Load tasks & measure timing
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Configure Grunt tasks
  grunt.initConfig({
    /**
     * Clean the `dist/` folder between builds.
     */
    clean: {
      'dist': ['dist/']
    },

    /**
     * Bump version numbers in `package.json` and `bower.json`,
     * and make a version commit marker. Used by CI script.
     */
    bump: {
      options: {
        files: ["package.json"],
        commitFiles: ["package.json"],
        push: false,
        createTag: false
      }
    },

    /**
     * Copy assets into `dist/` directory.
     */
    copy: {
      assets: {
        files: [
          {expand: true, src: ["assets/**"], dest: "dist/"}
        ]
      }
    },

    /**
     * Run Express pattern library server in background while
     * Grunt task is active.
     */
    express: {
      dev: {
        options: {
          script: 'styleguide/bin/start.js'
        }
      }
    },

    /**
     * Pre-process CSS with LibSass.
     */
    sass: {
      // On production builds, minify and remove comments.
      prod: {
        files: {
          'dist/forge.css': 'src/forge.scss',
          'dist/styleguide.css': 'styleguide/styleguide.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      },

      // On development builds, include source maps & do not minify.
      debug: {
        files: {
          'dist/forge.css': 'src/forge.scss',
          'dist/styleguide.css': 'styleguide/styleguide.scss'
        },
        options: {
          sourceMap: true
        }
      }
    },

    /**
     * Post-process CSS with PostCSS.
     *
     * We use Autoprefixer to automatically add vendor-prefixes for appropriate
     * browsers. We use CSS-MQPacker to concatenate all media queries at the
     * end of our built stylesheets.
     */
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 4 versions', 'Firefox ESR', 'Opera 12.1']
          }).postcss,
          require('css-mqpacker').postcss
        ]
      },

      // On production builds, omit source maps.
      prod: {
        src: ['dist/forge.css', 'dist/styleguide.css'],
        options: {
          map: false
        }
      },

      // On development builds, include source maps.
      debug: {
        src: ['dist/forge.css', 'dist/styleguide.css']
      }
    },

    /**
     * Build JavaScript with Webpack.
     */
    webpack: {
      options: {
        entry: './src/index.js',
        output: {
          filename: 'dist/forge.js',
          library: 'Forge',
          libraryTarget: 'umd'
        },
        externals: {
          // Don't bundle the 'jquery' package in forge.js, but
          // instead load from `jQuery` global variable or AMD/CJS package.
          'jquery': {
            root: 'jQuery',
            commonjs2: 'jquery',
            amd: 'jquery'
          }
        },
        module: {
          loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
          ]
        }
      },

      // On production builds, disable source maps & set production flags
      prod: {
        plugins: [
          new webpack.DefinePlugin({
            DEBUG: false,
            PRODUCTION: true
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              dead_code: true
            }
          })
        ]
      },

      // On development builds, include source maps & set debug flags
      debug: {
        devtool: '#inline-source-map',
        plugins: [
          new webpack.DefinePlugin({
            DEBUG: true,
            PRODUCTION: false
          })
        ]
      }
    },

    /**
     * Create custom Modernizr build based on referenced CSS
     * classes and JavaScript Modernizr checks.
     */
    modernizr: {
      all: {
        "devFile": "remote",
        "outputFile": "dist/modernizr.js",
        "files" : {
          "src": [
            "js/**/*.js",
            "!js/modernizr/**/*.js",
            "src/**/*.src"
          ]
        },
        extensibility : {
          // We prefix all Modernizr classes with `modernizr-` to avoid class conflicts.
          "cssclassprefix": "modernizr-"
        },
        "extra" : {
          "shiv" : false,
          "teststyles": true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "video": false
        },
        "customTests": [
          "js/modernizr/checked.js",
          "js/modernizr/label-click.js"
        ]
      }
    },

    /**
     * Lint JavaScript using ESLint.
     */
    eslint: {
      all: ["src/**/*.js", "!src/modernizr/**/*.js"]
    },

    /**
     * Lint SCSS using Sasslint.
     */
    sasslint: {
      all: ['src/**/*.src'],
    },

    /**
     * Watch files for changes, and trigger relevant tasks.
     */
    watch: {
      sass: {
        files: ["src/**/*.src"],
        tasks: ["sass:debug", "postcss:debug", "sasslint"]
      },
      js: {
        files: ["js/**/*.js"],
        tasks: ["webpack:debug", "eslint"]
      },
      assets: {
        files: ["assets/**/*"],
        tasks: ["copy:assets"]
      }
    }
  });

  /**
   * Register Grunt aliases.
   */

  // > grunt
  // Build for development & watch for changes.
  grunt.registerTask('default', ['build:debug', 'express:dev', 'test', 'watch']);

  // > grunt build
  // Build for production.
  grunt.registerTask('build', ['clean:dist', 'copy:assets', 'sass:prod', 'postcss:prod', 'webpack:prod', 'modernizr:all']);

  // > grunt build:debug
  // Build for development.
  grunt.registerTask('build:debug', ['clean:dist', 'copy:assets', 'sass:debug', 'postcss:debug', 'webpack:debug', 'modernizr:all']);

  // > grunt test
  // Run included unit tests and linters.
  grunt.registerTask('test', ['eslint', 'sasslint']);

};


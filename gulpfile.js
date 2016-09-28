'use strict';

var gulp = require('gulp');                 // Gulp.
var gutil = require('gulp-util');           // Gulp utilities.
var uglify = require('gulp-uglify');        // Uglify for JS.
var sass = require('gulp-sass');            // SASS.
var webpack = require('webpack-stream');    // Webpack.
var minifycss = require('gulp-clean-css');  // Minify css.
var nodemon = require('gulp-nodemon');
var path = require('path');

// Paths.
var srcPath = './src/';
var destPath = './dist/';
var modulesPath = './node_modules/';

////////////////////////////////////////////////////////////////////////////////
// Production/Development wrapper functions.
////////////////////////////////////////////////////////////////////////////////
var production = function(f) {
  return gutil.env.env == 'production' ? f : gutil.noop()
};

var development = function(f) {
  return gutil.env.env == 'development' ? f : gutil.noop()
};

////////////////////////////////////////////////////////////////////////////////
// Tasks
////////////////////////////////////////////////////////////////////////////////

// JSX
gulp.task('jsx', function() {
  gulp.src(srcPath + 'js/index.jsx')
    .pipe(webpack({
      watch: true,
      resolve: {
        root: [
          path.resolve('./src/data')
        ]
      },
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(production(uglify())) // Uglify in production only.
    .pipe(gulp.dest(destPath + 'js/'))
});

// Move .html.
gulp.task('html', function() {
  gulp.src(srcPath + '*.html')
    .pipe(gulp.dest(destPath))
});

// Move .html.
gulp.task('media', function() {
  gulp.src(srcPath + 'media/**/*')
    .pipe(gulp.dest(destPath + 'media/'));
});


// Compile .scss and move.
gulp.task('stylesheets', function() {
  gulp.src(srcPath + 'css/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(production(minifycss())) // Minify in production only.
    .pipe(gulp.dest(destPath + 'css/'))
});

////////////////////////////////////////////////////////////////////////////////
// Watch task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch(srcPath + 'css/**/*.scss', ['stylesheets']);  // SASS Main.
  gulp.watch(srcPath + 'css/**/_*.scss', ['stylesheets']); // SASS Partials.
  gulp.watch(srcPath + '*.html', ['html']);                // HTML files.
});

////////////////////////////////////////////////////////////////////////////////
// ExpressJS Server.
////////////////////////////////////////////////////////////////////////////////
gulp.task('server', function() {
  nodemon({
    script: './server.js'
  });
});

////////////////////////////////////////////////////////////////////////////////
// Group tasks.
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['server', 'watch', 'jsx', 'html', 'media', 'stylesheets']);
gulp.task('build', ['jsx', 'html', 'media', 'stylesheets']);

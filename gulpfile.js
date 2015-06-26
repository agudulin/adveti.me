var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var order = require('gulp-order');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglifyJS = require('gulp-uglifyjs');
var bower = require('gulp-bower');
var jsx = require('gulp-jsx');

var browserify = require('browserify');
var mainBowerFiles = require('main-bower-files');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var reactify = require('reactify');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('less', function() {
  gulp.src('app/assets/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('css', function() {
  var cssFiles = ['build/stylesheets/*'];
  gulp.src(mainBowerFiles().concat(cssFiles))
    .pipe(filter('*.css'))
    .pipe(order([
      'normalize.css',
      '*'
    ]))
    .pipe(concat('main.css'))
    .pipe(minifyCSS({ keepBreaks: false }))
    .pipe(gulp.dest('public/stylesheets'));
 });

gulp.task('watch', function() {
  gulp.watch('app/assets/stylesheets/*.less', ['less', 'css']);
  gulp.watch('app/assets/javascript/**/*.js', ['browserify']);
});

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify);
  b.add('./app/assets/javascript/app.js');
  return b.bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(jsx({ factory: "virtualdom.h" }))
    .pipe(uglifyJS())
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('build', ['less', 'css', 'browserify']);
gulp.task('default', ['less', 'css', 'watch', 'browserify']);

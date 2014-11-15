var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglifyJS = require('gulp-uglifyjs');

gulp.task('less', function() {
  gulp.src('app/assets/stylesheets/main.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(prefix({ cascade: true }))
      .pipe(minifyCSS({ keepBreaks: false }))
      .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch('app/assets/stylesheets/*.less', ['less']);
  gulp.watch('app/assets/javascript/*.js', ['uglifyjs']);
});

gulp.task('uglifyjs', function() {
  gulp.src('app/assets/javascript/*.js')
    .pipe(uglifyJS())
    .pipe(gulp.dest('public/javascript'))
});

gulp.task('default', ['less', 'watch', 'uglifyjs']);

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');

gulp.task('less', function() {
  gulp.src('public/stylesheets/main.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(prefix({ cascade: true }))
      .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-ruby-sass'),
	webserver = require('gulp-webserver'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
	return gulp.src('builds/js/script.js')
	  .pipe(jshint('./.jshint'))
	  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
	return sass('process/sass/style.scss', {
		sourcemap: true,
		style: 'expanded'
	})
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/js/**/*', ['js']);
  gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('builds/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'watch', 'webserver']);
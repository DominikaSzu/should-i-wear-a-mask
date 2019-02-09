const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');

gulp.task('sass', function() {
	return gulp.src('app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', function(){
	//starts a server
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})

	gulp.watch('app/scss/*.scss', gulp.series('sass'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/*.js').on('change', browserSync.reload);
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
				.pipe(useref())
				.pipe(gulpIf('*.js', terser()))
				.pipe(gulpIf('*.css', cssnano()))
				.pipe(gulp.dest('dist'))
});
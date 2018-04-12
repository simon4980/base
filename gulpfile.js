/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-connect gulp-cache --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect');


// Styles
gulp.task('styles', function() {
    return sass('assets/scss/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('site/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('site/css'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('assets/scripts/*.js')
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('site/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('site/img'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('assets/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('assets/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('assets/img/**/*', ['images']);

});

// Live server reload
gulp.task('connect', function() {
    connect.server({
      root: 'site/.',
      livereload: true
    })
});

gulp.task('default', ['styles', 'scripts', 'images', 'connect', 'watch']);


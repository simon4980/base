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
    // notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    inlinesource = require('gulp-inline-source');



// Styles
gulp.task('styles', function() {
    return sass('src/scss/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
        // .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
        // .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
        // .pipe(notify({ message: 'Images task complete' }));
});

// Copy html file from src/html to dist/
gulp.task("copy-html", ['styles', 'scripts'], function () {
    return gulp.src('src/html/*.html')
        .pipe(inlinesource({rootpath: 'dist/'}))
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['styles', 'copy-html']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts', 'copy-html']);

    // Watch image files
    gulp.watch('src/img/**/*', ['images']);

    // Watch html files
    gulp.watch('src/html/*.html', ['copy-html']);

});

// Live server reload
gulp.task('connect', function() {
    connect.server({
      root: 'dist/.',
      livereload: true
    })
});

gulp.task('default', ['styles', 'scripts', 'images', 'copy-html', 'connect', 'watch']);


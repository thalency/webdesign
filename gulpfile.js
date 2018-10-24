let path = {
    css: {
        src: 'src/assets/css/*.css',
        dest: 'public/assets/css',
        inject: 'public/assets/css/*.css'
    },
    html: {
        src: 'src/*.html',
        dest: 'public'
    }
};


const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const browsersync = require('browser-sync').create();

gulp.task('browser-sync', function (done) {
    browsersync.init({
        server: 'public'
    });
    done();
});

gulp.task('html', function () {
    return gulp.src(path.html.src)
        .pipe(inject(gulp.src(path.css.inject, {read: false}), {
            ignorePath: 'public',
        }))
        .pipe(gulp.dest(path.html.dest))
        .pipe(browsersync.stream())
});

gulp.task('css', function () {
    return gulp.src(path.css.src)
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.css.dest))
        .pipe(browsersync.stream())

});

gulp.task('watch:css', () => gulp.watch(path.css.src, gulp.series('css')));
gulp.task('watch:html', () => gulp.watch(path.html.src, gulp.series('html')));
gulp.task('watch', gulp.parallel('watch:css', 'watch:html'));

gulp.task('default', gulp.series('css', 'html', 'browser-sync', 'watch'));


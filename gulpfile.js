let path = {
    sass: {
        src: 'src/assets/scss/main.scss',
        dest: 'public/assets/css',
        inject: 'public/assets/css/*.css',
        watch: 'src/assets/scss/*.scss'
    },
    html: {
        src: 'src/*.html',
        dest: 'public',
        watch: 'src/*.html'
    },
    js: {
        src: 'src/assets/js/main.js',
        dest: 'public/assets/js',
        inject: 'public/assets/js/*.js',
        watch: 'src/assets/js/*.js'
    },
    img: {
        src: 'src/assets/img/*',
        dest: 'public/assets/img',
        watch: 'src/assets/img/*'
    }
};


const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
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
        .pipe(inject(gulp.src([path.sass.inject, path.js.inject], {read: false}), {
            addRootSlash: false,
            ignorePath: 'public',
        }))
        .pipe(gulp.dest(path.html.dest))
        .pipe(browsersync.stream())
});

gulp.task('sass', function () {
    return gulp.src(path.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browsersync.stream())
});

gulp.task('js', function () {
    return gulp.src(path.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(path.js.dest))
        .pipe(browsersync.stream())
});
gulp.task('img', function () {
    return gulp.src(path.img.src)
        .pipe(gulp.dest(path.img.dest))
        .pipe(browsersync.stream())
});

gulp.task('img:watch', () => gulp.watch(path.img.watch, gulp.series('img')));
gulp.task('sass:watch', () => gulp.watch(path.sass.watch, gulp.series('sass')));
gulp.task('js:watch', () => gulp.watch(path.js.watch, gulp.series('js')));
gulp.task('html:watch', () => gulp.watch(path.html.watch, gulp.series('html')));
gulp.task('watch', gulp.parallel('img:watch', 'sass:watch', 'js:watch', 'html:watch'));

gulp.task('default', gulp.series('img', 'sass', 'js', 'html', 'browser-sync', 'watch'));


// Gulp Utilities
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');

const path = require('path');

// Transforms
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const imagemin = require('gulp-imagemin');

// Bundling
const browserify = require('browserify');

const PATHS = {
    sass: 'src/styles',
    pug: 'src/views',
    js: 'src/scripts',
    images: 'src/images',
    dist: 'dist'
}

gulp.task('clean', () => {
    return del(['dist/**']);
});

gulp.task('pug', () => {
    return gulp.src(path.join(PATHS.pug, '*.pug'))
            .pipe(plumber())
            .pipe(pug())
        // .pipe(gulp.dest(function(file) {
        //     return path.join(PATHS.dist, 'pages', path.basename(file.path, '.html'));
        // }));
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('sass', () => {
    return gulp.src(path.join(PATHS.sass, '*.scss'))
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer())
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('images', () => {
    return gulp.src(path.join(PATHS.images, '*'))
            .pipe(plumber())
            .pipe(imagemin())
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('bundle', () => {
    return browserify({ entries: './src/scripts/index.js' })
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'pug', 'sass', 'bundle', 'images']);

gulp.task('watch', ['build'], () => {
    gulp.watch(path.join(PATHS.sass, '**', '*.scss'), ['sass']);
    gulp.watch(path.join(PATHS.pug, '**', '*.pug'), ['pug']);
    gulp.watch(path.join(PATHS.js, '**', '*.js'), ['bundle']);
    gulp.watch(path.join(PATHS.images, '**'), ['images']);
});
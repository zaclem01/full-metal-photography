// Gulp Utilities
const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const del = require('del');

const path = require('path');

// Transforms
const pug = require('gulp-pug');
const sass = require('gulp-sass');

const PATHS = {
    sass: 'src/scss',
    pug: 'src/pug',
    js: 'src/js',
    dist: 'dist'
}

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('pug', function() {
    return gulp.src(path.join(PATHS.pug, '*.pug'))
            .pipe(plumber())
            .pipe(pug())
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('sass', function() {
    return gulp.src(path.join(PATHS.sass, '*.scss'))
            .pipe(plumber())
            .pipe(sass())
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build', ['clean', 'pug', 'sass']);

gulp.task('watch', ['build'], function() {
    gulp.watch(path.join(PATHS.sass, '**', '*.scss'), ['sass']);
    gulp.watch(path.join(PATHS.pug, '**', '*.pug'), ['pug']);
});
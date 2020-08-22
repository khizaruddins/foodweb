const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File Paths
var distPath = 'dist';
var scriptsPath = 'assets/js/**/*.js';
var sassPath = 'assets/css/**/styles.sass';
var pugPath = 'templates/layouts/*.pug';
var imgPath = 'assets/images/**.*{png,jpeg,jpg,gif,svg}';

// Tasks
gulp.task('clean', () => {
    console.log('starting cleaning task');
    return del.sync([distPath]);
});

// styles task
gulp.task('styles', () => {
    console.log('starting styles task');
    return gulp.src(sassPath)
        .pipe(plumber((err) => {
            console.log('styling errors... ');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distPath + '/css'))
        .pipe(livereload());
});

// templating pug task
gulp.task('pug', () => {
    console.log('starting pug task');
    return gulp.src(pugPath)
        .pipe(plumber((err) => {
            console.log('pug errors..');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./html'))
        .pipe(livereload());
});

// Image optimization

gulp.task('imgcompress', () => {
    console.log('starting image optimization task');
    return gulp.src(imgPath)
        .pipe(imagemin(
        ))
        .pipe(gulp.dest(distPath + '/images'));

})

// scripts task
gulp.task('scripts', () => {
    console.log('starting scripts task');
    return gulp.src(scriptsPath)
        .pipe(sourcemaps.init())
        .pipe(plumber((err) => {
            console.log('scripting errors...');
            console.log(err);
            this.emit('end');
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distPath + '/js'))
        .pipe(livereload());
});

// gulp watch
gulp.task('watch', () => {
    console.log('Watching files..');
    require('./server.js');
    gulp.watch(distPath, gulp.series('clean'));
    gulp.watch(pugPath, gulp.series('pug'));
    gulp.watch(sassPath, gulp.series('styles'));
    gulp.watch(scriptsPath, gulp.series('scripts'));
    livereload.listen();
});

gulp.task('images', () => console.log('image optimizing started'));

gulp.task('default', gulp.series('watch'), () => console.log('default function started'));
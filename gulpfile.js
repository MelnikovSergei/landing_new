const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');



/* --------- Server -----------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});




/* ---------- Pug complete ----------- */
gulp.task('templates:complete', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty : true
        }))
        .pipe(gulp.dest('build'))
});





/* ---------- Style complete ----------- */
gulp.task('styles:complete', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});




/* ---------- JS complete ----------- */

gulp.task('js:complete', function(){
   return gulp.src([
           'source/js/form.js',
           'source/js/main.js'
        ])
       .pipe(sourcemaps.init())
       .pipe(concat('main.min.js'))
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('build/js'))

});


/* ---------- Sprites ----------- */
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();

});

/* ------------- Delete -------------*/
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});

/* ------------- Copy fonts -------------*/
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------- Copy images ------------*/
gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});


/* ------------- Copy fonts and images ------------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));


/* ------------- Watchers ------------*/
gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:complete'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:complete'));
    gulp.watch('source/js/**/*.js', gulp.series('js:complete'));
});


/* ------------- Default ------------*/
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:complete', 'styles:complete', 'js:complete', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);





const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require("gulp-rename");


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




/* ---------- Pug complite ----------- */
gulp.task('templates:complite', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty : true
        }))
        .pipe(gulp.dest('build'))
});





/* ---------- Style complite ----------- */
gulp.task('styles:complite', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});





/* ---------- Sprites ----------- */
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icon/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.css'
    }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('build/styles/global/'));
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
    gulp.watch('source/template/**/*.pug', gulp.series('templates:complite'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:complite'));
});



gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:complite', 'styles:complite', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);



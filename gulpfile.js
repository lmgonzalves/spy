var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        online: false,
        notify: false
    });

    gulp.watch('scss/**', ['sass']);
    gulp.watch(['*.html', 'js/**']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('scss/**')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 5 versions', '> 1%'], { cascade: true }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['serve']);

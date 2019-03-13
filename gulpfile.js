var gulp = require('gulp');
var minCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//起服务
gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            open: true,
            livereload: true
        }))
})

//编译sass
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
//压缩css
gulp.task('minCss', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./dist/css'))
})
//监听css
gulp.task('watch', function () {
    return gulp.watch('./src/sass/**/*.scss', gulp.series('sass'))
})
//编译合并js
gulp.task('minJs', function () {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./dist/js'))

})

gulp.task('default', gulp.series('minJs', 'sass', 'server', 'watch'));
gulp.task('build', gulp.parallel('minJs', 'minCss'));
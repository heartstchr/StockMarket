var gulp = require('gulp'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

// assets is where you define your application assets and you can pass them into gulp.
var gulpFileCwd = __dirname +'/server/angular';
process.chdir(gulpFileCwd);
util.log('Working directory changed to', util.colors.magenta(gulpFileCwd));
gulp.task('default', function(){
    gulp.src(gulpFileCwd+'/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(gulpFileCwd+'/'));
});

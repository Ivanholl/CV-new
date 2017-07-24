var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    path = require('path'),
    concatCss = require('gulp-concat-css'),
    jade = require('jade'),
    clean = require('gulp-clean');
    runSequence = require('run-sequence');
    gulpJade = require('gulp-jade');

gulp.task('buildJs', function() {
    return gulp.src('js/*.js')
        .pipe(concat('buildedJs.js'))
 		.pipe(gulp.dest('build'))
});
gulp.task('buildLess', function() {
    return gulp.src('./styles/*.less')
        .pipe(less({
            paths: [path.join('../', 'less', 'includes')]
        }))
        .pipe(gulp.dest('styles/css'));
});
gulp.task('buildCss', function(){
    return gulp.src('./styles/css/*.css')
        .pipe(concatCss('buildedCss.css'))
        .pipe(gulp.dest('build'));
});
gulp.task('removeCss', ['buildCss'], function(){
    return gulp.src('./styles/css')
        .pipe(clean({force: true}))
})
gulp.task('handleLess', function(done) {
    runSequence('buildLess', 'buildCss', 'removeCss', function() {
        done();
    });
});
gulp.task('buildIndexJade', function(){
    return gulp.src('templates/index.jade')
        .pipe(gulpJade({
          jade: jade,
          pretty: true
        }))
        .pipe(gulp.dest('.'));
});
gulp.task('buildTemplates', function(){
    return gulp.src(['!./templates/index.jade' ,'./templates/*.jade'])
        .pipe(gulpJade({
              jade: jade,
              pretty: true
        }))
        .pipe(gulp.dest('build/html'));
});
gulp.task('watch', ['buildJs', 'handleLess', 'buildIndexJade', 'buildTemplates'], function() {
    gulp.watch(['./js/*.js'], ['buildJs']);
    gulp.watch(['./styles/*.less'], ['handleLess']);
    gulp.watch(['./templates/index.jade'], ['buildIndexJade']);
    gulp.watch(['./templates/*.jade'], ['buildTemplates']);
});
gulp.task('r', ['watch', 'buildJs', 'handleLess', 'buildIndexJade', 'buildTemplates']);

/**
 * Created by yinka_000 on 2016-09-14.
 */
'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-ngmin'),
    rename = require('gulp-rename');

gulp.task("concatAngular", function(){
    gulp.src(
        ['public/javascripts/angularApps/main.js',
            'public/javascripts/angularApps/AngularTeamService.js',
            'public/javascripts/angularApps/RosterService.js',
            'public/javascripts/angularApps/StatCtrl.js',
            'public/javascripts/angularApps/PlayerCtrl.js'
        ])
        .pipe(concat('final.js'))
        .pipe(gulp.dest('public/javascripts/angularApps'));

});

gulp.task("minify", function () {
    gulp.src('public/javascripts/angularApps/final.js')
        .pipe(uglify({dynamic: true}))
        .pipe(rename('final.min.js'))
        .pipe(gulp.dest('public/javascripts/angularApps'));
});
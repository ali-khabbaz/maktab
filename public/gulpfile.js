(function () {
	/*use strict*/
	var gulp = require('gulp'),
		rename = require('gulp-rename'),
		inject = require('gulp-inject'),
		concat = require('gulp-concat'),
		rewriteCSS = require('gulp-rewrite-css'),
		uglify = require('gulp-uglify'),
		minify = require('gulp-minify-css'),
		iife = require('gulp-iife'),
		ngAnnotate = require('gulp-ng-annotate');



	var commonCss = [
			"./vendor/jquery-ui/ui/themes/smoothness/jquery-ui.min.css",
			"./vendor/angucomplete-alt/angucomplete-alt.css",
			"./assets/css/style.css",
			"./vendor/angular/angular-csp.css"
		],
		commonJsBefore = [
			'./vendor/jquery/dist/jquery.min.js',
			'./vendor/angular/angular.min.js',
			'./vendor/angular-route/angular-route.min.js',
			'./vendor/angular-animate/angular-animate.min.js',
			'./vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js',
			'./vendor/angular-resource/angular-resource.min.js',
			'./vendor/satellizer.js',
			'./vendor/angular-sanitize/angular-sanitize.min.js',
			'./vendor/angular-utils-pagination/dirPagination.js',
			'./vendor/jwplayer/jwplayer.js'
		],
		commonJsAfter = [
			'./vendor/angular-utils-pagination/dirPagination.js',
			'./vendor/jwplayer/jwplayer.js'
		];
	//
	gulp.task('index', function () {
		var target = gulp.src('./views/_index.ejs');
		// It's not necessary to read the files (will speed up things), we're only after their paths:
		var sources = gulp.src(
			commonJsBefore
			.concat(commonCss));
		var secondSources = gulp.src(
			['./app/**/*.module.js', './app/**/*.js'], {
				read: true
			});
		return target
			.pipe(inject(gulp.src(commonJsBefore, {
				read: false
			}), {
				starttag: '<!-- inject:before-body:{{ext}} -->'
			}))
			.pipe(inject(gulp.src(['./app/**/*.module.js', './app/**/*.js'], {
				read: false
			}), {
				starttag: '<!-- inject:after-body:{{ext}} -->'
			}))
			.pipe(inject(gulp.src(commonCss)))
			.pipe(rename(function (path) {
				path.basename = path.basename.replace('_', '');
			}))
			.pipe(gulp.dest('./views/'));
	});

	/*gulp.task('build:commonCss', function () {
		gulp.src(commonCss)
			.pipe(rewriteCSS({
				destination: './assets/dist/'
			}))
			.pipe(uglify())
			.pipe(concat('common.css'))
			.pipe(gulp.dest('./assets/dist/'));
	});*/

	gulp.task('prod', ['js', 'css'], function () {
		var target = gulp.src('./views/_index.ejs');

		return target
			.pipe(inject(gulp.src(['./assets/dist/vendor.js',
				'./assets/dist/script.js'], {
				read: false
			}), {
				starttag: '<!-- inject:before-body:{{ext}} -->'
			}))
			.pipe(inject(gulp.src(['./assets/dist/style.css'])))
			.pipe(rename(function (path) {
				path.basename = path.basename.replace('_', '');
			}))
			.pipe(gulp.dest('./views/'));
	});

	gulp.task('css', function () {
		gulp.src(commonCss)
			.pipe(concat('style.css'))
			.pipe(rewriteCSS({
				destination: './assets/dist/'
			}))
			.pipe(minify())
			.pipe(gulp.dest('./assets/dist/'));
	});

	gulp.task('js', function () {
		gulp.src(['./app/app.module.js', './app/**/*.module.js', './app/core/*.js'])
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(ngAnnotate())
			.pipe(gulp.dest('./assets/dist/'));

		gulp.src(commonJsBefore)
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(iife())
			.pipe(ngAnnotate())
			.pipe(gulp.dest('./assets/dist/'));
	});
	//in video module after adding video route file error shows up
	gulp.task('js-test', function () {
		gulp.src(['./app/app.module.js', './app/**/*.module.js',
				'./app/**/*.js'
			])
			.pipe(ngAnnotate({
				// true helps add where @ngInject is not used. It infers.
				// Doesn't work with resolve, so we must be explicit there
				add: true
			}))
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./assets/dist/'));

		gulp.src(commonJsBefore)
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(ngAnnotate())
			.pipe(gulp.dest('./assets/dist/'));

		gulp.src(commonJsAfter)
			.pipe(concat('after.js'))
			.pipe(uglify())
			.pipe(ngAnnotate())
			.pipe(gulp.dest('./assets/dist/'));
	});


	gulp.task('prod-test', ['js-test', 'css'], function () {
		var target = gulp.src('./views/_index.ejs');

		return target
			.pipe(inject(gulp.src(['./assets/dist/vendor.js',
				'./assets/dist/script.js'], {
				read: false
			}), {
				starttag: '<!-- inject:before-body:{{ext}} -->'
			}))

		.pipe(inject(gulp.src(['./assets/dist/after.js'], {
			read: true
		}), {
			starttag: '<!-- inject:after-body:{{ext}} -->'
		}))

		.pipe(inject(gulp.src(['./assets/dist/style.css'])))

		.pipe(rename(function (path) {
				path.basename = path.basename.replace('_', '');
			}))
			//.pipe(iife())
			.pipe(gulp.dest('./views/'));
	});


})();

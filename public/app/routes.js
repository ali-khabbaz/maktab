(function () {
	'use strict';
	define(['app'], function (app) {
		return {
			defaultRoutePath: '/main',
			routes: {
				'/main': {
					templateUrl: '/app/main/main.html',
					dependencies: [
						'/app/main/controllers/FirstPageSignupController.js',
						'/app/main/controllers/TopCardsController.js',
						'/app/main/controllers/TopCategories.js',
						'/app/main/controllers/TopArticlesAndSubCategoriesController.js'
					]
				},
				'/courses/:searchWord?': {
					templateUrl: '/app/courses/courses.html',
					dependencies: [
						'/app/courses/coursesFactory.js',
						//'/app/courses/mainCoursesController.js',
						'/app/courses/CoursesFilter.js'
					]
				},
				'/page1': {
					templateUrl: '/app/page1/page1.html',
					dependencies: [
						'/app/page1/page1Ctrl.js'
					]
				},
				'/register': {
					templateUrl: '/app/register/register.html',
					dependencies: [
						'/app/register/registerCtrl.js',
						'/app/register/registerDirective.js'
					]
				},
				'/login': {
					templateUrl: '/app/login/login.html',
					dependencies: [
						'/app/login/loginCtrl.js'
					]
				},
				'/jobs': {
					templateUrl: '/app/jobs/jobs.html',
					dependencies: [
						'/app/jobs/jobsCtrl.js'
					]
				},
				'/articleList': {
					templateUrl: '/app/articleList/articleList.html',
					dependencies: [
						'/app/articleList/articleListCtrl.js'
					]
				},
				'/video/:artId': {
					templateUrl: '/app/video/video.html',
					dependencies: [
						'/app/video/videoCtrl.js',
						'/app/video/videoFactory.js',
						'/app/video/videoDirective.js'
					]
				},
				'/search/:searchQuery': {
					templateUrl: '/app/search/search.html',
					dependencies: [
						'/app/search/searchCtrl.js',
						'/app/search/searchFactory.js'
					]
				}
			}
		};
	});
}());
(function () {
	'use strict';
	require.config({
		waitSeconds: 0,
		baseUrl: '/app/',
		paths: {
			'app': 'app',
			'angular': '../vendor/angular/angular.min',
			'angular-route': '../vendor/angular-route/angular-route.min',
			'angular-animate': '../vendor/angular-animate/angular-animate.min',
			'jquery': '../vendor/jquery/dist/jquery.min',
			//'jquery-ui': '../vendor/jquery-ui-1.11.4.custom/jquery-ui.min',
			'angular-resource': '../vendor/angular-resource/angular-resource.min',
			'MainViewCtrl': 'main/MainViewCtrl',
			'FirstPageSearchController': 'main/controllers/FirstPageSearchController',
			'mainViewFactory': 'main/mainViewFactory',
			'mainDirective': 'main/mainDirective',
			'homeFactory': 'main/homeFactory',
			'authInterceptor': 'main/authInterceptor',
			'satellizer': '../vendor/satellizer',
			'sanitize': '../vendor/angular-sanitize/angular-sanitize.min',
			'pagination': '../vendor/angular-utils-pagination/dirPagination',
			'jwPlayer': '../vendor/jwplayer/jwplayer'
				/*'videogular': '../vendor/videogular/videogular.min',
				'videogular_controls': '../vendor/videogular-controls/vg-controls',
				'videogular_poster': '../vendor/videogular-poster/vg-poster.min',
				'videogular_overplay': '../vendor/videogular-overlay-play/vg-overlay-play.min',
				'videogular_buffering': '../vendor/videogular-buffering/vg-buffering.min',*/
				//'videojs': '../vendor/video.js/dist/video'
				//'videojs': '../vendor/video.js/src/js/video'
		},
		shim: {
			'app': {
				deps: ['angular', 'angular-route', 'angular-resource', 'satellizer', 'jquery',
					/*'jquery-ui',*/
					'angular-animate', 'sanitize', 'pagination', 'jwPlayer'
					/* 'videogular', 'videogular_controls',
										'videogular_poster',
										'videogular_buffering',
										'videogular_overplay', */
					//'videojs'
				]
			},
			'angular-route': {
				deps: ['angular']
			},
			'angular-resource': {
				deps: ['angular']
			},
			'satellizer': {
				deps: ['angular']
			},
			'sanitize': {
				deps: ['angular']
			},
			'pagination': {
				deps: ['angular']
			},
			'jwPlayer': {
				deps: ['angular', 'jquery']
			},
			/*'videogular': {
				deps: ['angular', 'sanitize']
			},
			'videogular_controls': {
				deps: ['angular', 'videogular', 'sanitize']
			},
			'videogular_poster': {
				deps: ['angular', 'videogular', 'sanitize']
			},
			'videogular_overplay': {
				deps: ['angular', 'videogular', 'sanitize']
			},
			'videogular_buffering': {
				deps: ['angular', 'videogular', 'sanitize']
			},*/
			'angular': {
				deps: ['jquery']
			},
			/*'videojs': {
				deps: ['angular']
			},*/
			'angular-animate': {
				deps: ['angular']
			},
			/*'accordion': {
				deps: ['angular', 'angular-animate', 'collapse']
			},
			'collapse': {
				deps: ['angular', 'angular-animate']
			}*/

		}
	});
	requirejs.onError = function (err) {
		console.error('[require error] type: ', err.requireType, ' ,modules: ' + err.requireModules);
		throw err;
	};
	require(['app'], function () {
		require(['MainViewCtrl', 'mainViewFactory', 'authInterceptor',
			'homeFactory', 'FirstPageSearchController', 'mainDirective'
		], function () {
			angular.bootstrap(document, ['app']);
		});
	});
})();
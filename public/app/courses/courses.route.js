(function () {
	angular
		.module('app.courses')
		.run(appRun);
	/* @ngInject */
	function appRun(routeService) {
		routeService.configureRoutes(getRoutes());
	}

	function getRoutes() {
		return [{
			url: '/courses',
			config: {
				templateUrl: '/app/courses/courses.html'
			}
		}, {
			url: '/courses/search/:searchParam?',
			config: {
				templateUrl: '/app/courses/courses.html'
			}
		}, {
			url: '/courses/filter/software/:software?/author/:author?/resource/:resource?/level/:level?',
			config: {
				templateUrl: '/app/courses/courses.html'
			}
		}];
	}
})();

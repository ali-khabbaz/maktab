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
			url: '/courses/:searchWord?',
			config: {
				templateUrl: '/app/courses/courses.html'
			}
		}];
	}
})();
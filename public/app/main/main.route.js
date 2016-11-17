(function () {
	angular
		.module('app.main')
		.run(appRun);
	/* @ngInject */
	function appRun(routeService) {
		routeService.configureRoutes(getRoutes());
	}

	function getRoutes() {
		return [{
			url: '/main',
			config: {
				templateUrl: '/app/main/main.html',
				isDefault: true
			}
		}];
	}
})();
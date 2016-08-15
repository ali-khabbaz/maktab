(function () {
	console.log('main.route');
	angular
		.module('app.main')
		.run(appRun);
	/* @ngInject */
	function appRun(routeService) {
		console.log('appRun');
		routeService.configureRoutes(getRoutes());
	}

	function getRoutes() {
		console.log('main.route');
		return [{
			url: '/main',
			config: {
				templateUrl: '/app/main/main.html',
				isDefault: true
			}
		}];
	}
})();
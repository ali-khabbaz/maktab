(function () {
	angular
		.module('app.video')
		.run(appRun);
	/* @ngInject */
	function appRun(routeService) {
		routeService.configureRoutes(getRoutes());
	}

	function getRoutes() {
		return [{
			url: '/video/:artId',
			config: {
				templateUrl: '/app/video/video.html'
			}
		}];
	}
})();
(function () {
	'use strict';

	angular
		.module('app.core')
		.config(configure);
	// .config(toastrConfig);

	/* @ngInject */
	function configure($routeProvider, routeServiceConfigProvider, $httpProvider) {
		// turn debugging off/on (no info or warn)
		routeServiceConfigProvider.config.$routeProvider = $routeProvider;
		$httpProvider.interceptors.push('authInterceptor');
	}


})();
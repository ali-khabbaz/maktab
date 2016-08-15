(function () {
	'use strict';
	angular
		.module('app.core')
		.factory('authInterceptor', authInterceptor);
	/* @ngInject */
	function authInterceptor($window) {
		var storage = $window.localStorage;
		var factory = {
			request: request,
			response: response
		};
		return factory;

		function request(config) {
			var token = storage.getItem('userToken');
			if (token) {
				config.headers.authorization = 'ali is just.' + token;
			}
			return config;
		}

		function response(res) {
			return res;
		}
	}
})();
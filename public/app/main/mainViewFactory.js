(function () {
	'use strict';

	angular
		.module('app.main')
		.factory('mainViewFactory', mainViewFactory);
	/* @ngInject */
	function mainViewFactory($window, $location) {
		var factory = {
				getToken: getToken,
				setToken: setToken,
				getUser: getUser,
				setUser: setUser,
				isAuthenticated: isAuthenticated,
				getApiUrl: getApiUrl,
				//getSearchData: getSearchData,
				removeToken: removeToken,
				request: request,
				response: response,
				objectSort: objectSort
			},
			storage = $window.localStorage,
			cachedToken;
		return factory;

		function getApiUrl() {
			return $location.absUrl().split('/#/')[0] + '/';
		}

		function setToken(token) {
			cachedToken = token;
			storage.setItem('userToken', token);
		}

		function getToken() {
			if(!cachedToken) {
				cachedToken = storage.getItem('userToken');
			}
			return cachedToken;
		}

		function isAuthenticated() {
			return !!getToken();
		}

		function setUser(user) {
			if(isAuthenticated()) {
				storage.setItem('userInfo', user);
			}
		}

		function getUser() {
			return storage.getItem('userInfo');
		}

		function removeToken() {
			cachedToken = null;
			storage.removeItem('userToken');
			storage.removeItem('userInfo');
		}

		function request(config) {
			var token = getToken();
			if(token) {
				config.headers.authorization = 'ali is just' + token;
			}
			return config;
		}

		function response(res) {
			return res;
		}

		function getTopCards() {
			var url = factory.getApiUrl() + 'app/getTopCards',
				dfd = q.defer();
			http.post(url).success(function (res) {
				dfd.resolve([null, res]);
			}).error(function (err) {
				dfd.resolve([err]);
			});
			return dfd.promise;
		}

		function objectSort(data, key, order) {
			data.sort(function (a, b) {
				if(a[key] > b[key]) {
					if(order === 'asc') {
						return 1;
					} else if(order === 'desc') {
						return -1;
					}
				} else if(a[key] < b[key]) {
					if(order === 'asc') {
						return -1;
					} else if(order === 'desc') {
						return 1;
					}
				} else {
					return 0;
				}
			});
			return data;
		}
	}

	/*app.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('mainViewFactory');
	}]);*/

}());

(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('loginCtrl', loginCtrl);

		loginCtrl.$inject = ['$http', 'mainViewFactory', '$window', '$auth'];

		function loginCtrl($http, mainFac, $window, $auth) {
			var vm = this;
			vm.login = login;
			vm.authenticated = mainFac.isAuthenticated();
			vm.logOut = logOut;
			vm.google = google;
			vm.user = '';

			function logOut() {
				mainFac.removeToken();
				vm.authenticated = mainFac.isAuthenticated();
			}
			if (mainFac.isAuthenticated()) {
				vm.user = mainFac.getUser();
			}

			function login(e, p) {
				var url = mainFac.getApiUrl() + "app/login";
				var data = {
					"email": e,
					"password": p
				};

				$http.post(url, data).success(function (res) {
					console.log('>>>>>>>', res);
					mainFac.setToken(res.token);
					mainFac.setUser([
						res.user,
						res.id
					]);
					console.log('get user', mainFac.getUser());
					vm.user = mainFac.getUser();
					vm.authenticated = mainFac.isAuthenticated();
				}).error(function (err) {
					console.log('error is', err);
				});
			}

			function google() {
				console.log('>>', window.location.origin);
				var url_builder = ['response_type=code',
					'client_id=868760868685-e98cfb4bg4cpbcgptd5ilvp81tnoa4jp.apps.googleusercontent.com',
					'scope=profile email',
					'redirect_uri=http://localhost/'
				];
				var url = 'https://accounts.google.com/o/oauth2/auth?' + url_builder.join('&');
				var options = 'width=500, height=500, left= ' + ($window.outerWidth - 500) / 2 +
					', top=' + ($window.outerHeight - 500) / 2.5;
				var pop_up = $window.open(url, '', options);
				$window.focus();
				console.log('focused');
				$window.addEventListener('message', function (event) {
					if (event.origin === $window.location.origin) {
						pop_up.close();
						var url = mainFac.getApiUrl() + "app/google-auth";
						var code = {
							"code": event.data,
							"client_id": '868760868685-e98cfb4bg4cpbcgptd5ilvp81tnoa4jp.apps.googleusercontent.com',
							"redirect_uri": 'http://localhost/'
						};

						$http.post(url, code)
							.success(function (res) {
								console.log('getting res', res);
								mainFac.setToken(res.token);
								mainFac.setUser([
									res.user,
									res.id
								]);
								console.log('get user', mainFac.getUser());
								vm.user = mainFac.getUser();
								vm.authenticated = mainFac.isAuthenticated();
							}).error(function (err) {
								console.log('error is', err);
							});
					}
				});
			}
			/*function google(provider) {
				$auth.authenticate(provider).then(function (res) {
					console.log('ok', res);
				}, handleError);
			}*/

			function handleError(err) {
				console.log('err', err);
			}
		}

	});
}());
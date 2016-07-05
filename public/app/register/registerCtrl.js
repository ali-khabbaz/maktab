(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('registerCtrl', registerCtrl);
		registerCtrl.$inject = ['$http', 'mainViewFactory'];

		function registerCtrl($http, mainFac) {
			var vm = this;
			vm.register = register;
			vm.logOut = logOut;
			vm.authenticated = mainFac.isAuthenticated();
			vm.user_email = '';

			function logOut() {
				mainFac.removeToken();
				vm.authenticated = mainFac.isAuthenticated();
			}

			function register(email, password) {
				var url = "http://127.0.0.1/app/register";
				var data = {
					"email": email,
					"password": password
				};
				$http.post(url, data).success(function (res) {
					mainFac.setToken(res.token);
					mainFac.setUser([
						res.user,
						res.id
					]);
					vm.user = mainFac.getUser();
					vm.authenticated = mainFac.isAuthenticated();
				}).error(function (err) {
					console.log('error is', err);
				});
			}
		}
	});
}());
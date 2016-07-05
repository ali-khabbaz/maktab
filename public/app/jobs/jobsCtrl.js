(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('jobsCtrl', jobsCtrl);
		jobsCtrl.$inject = ['$http', 'mainViewFactory'];

		function jobsCtrl($http, mainFac) {
			var vm = this;
			vm.jobs_data = '';
			getJobs();

			function getJobs() {
				var url = mainFac.getApiUrl() + "app/jobs";
				$http.post(url)
					.success(function (res) {
						vm.jobs_data = res;
					}).error(function (err) {
						console.log('error is', err);
						vm.jobs_data = err;
					});
			}
		}
	});
}());
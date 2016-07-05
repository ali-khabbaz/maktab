(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('searchCtrl', searchCtrl);
		searchCtrl.$inject = ['mainViewFactory', '$routeParams', 'searchFactory'];

		function searchCtrl(mainFac, par, sf) {
			var vm = this;
			vm.searchResult = '';
			vm.searchQuery = par.searchQuery;

			main();

			function main() {
				getSearchResult();
			}

			function getSearchResult() {
				sf.getSearchResult(vm.searchQuery)
					.then(function (res) {
						if (res[0]) {
							console.log('getSearchResult Err', res[0]);
						} else {
							vm.searchResult = res[1];
							console.log('getSearchResult', vm.searchResult);
						}
					});
			}

		}
	});
}());
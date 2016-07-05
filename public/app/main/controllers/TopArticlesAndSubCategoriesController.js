(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('TopArticlesAndSubCategories', TopArticlesAndSubCategories);

		TopArticlesAndSubCategories.$inject = ['mainViewFactory', 'homeFactory'];

		function TopArticlesAndSubCategories(mainViewFactory, homeFactory) {
			/* js hint valid this: true*/
			var vm = this;
			vm.topSubCategories = '';
			vm.tab = 'Best';
			vm.loadingshow = true;
			vm.changeTab = changeTab;

			main();

			function main() {
				homeFactory.getArticlesAndSubCategories().then(function (res) {
					vm.topSubCategories =
						homeFactory.topSubCategoriesDataReady(
							res[0].data.data, res[1].data.data, res[2].data.data
						);
					vm.loadingshow = false;
				});
			}

			function changeTab(selected) {
				vm.tab = selected;
			}
		}
	});
}());
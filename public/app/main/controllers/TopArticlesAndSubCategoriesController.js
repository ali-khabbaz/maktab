(function () {
	'use strict';
	angular
		.module('app.main')
		.controller('TopArticlesAndSubCategories', TopArticlesAndSubCategories);
	/* @ngInject */
	function TopArticlesAndSubCategories(homeFactory) {
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
						res[0].data.data[1], res[1].data.data[1][0], res[2].data.data[1]
					);
				vm.loadingshow = false;
			});
		}

		function changeTab(selected) {
			vm.tab = selected;
		}
	}
}());

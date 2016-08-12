(function () {
	'use strict';
	angular
		.module('app.main')
		.controller('TopCategories', TopCategories);
	/* @ngInject */
	function TopCategories(mainViewFactory, homeFactory) {
		/* js hint valid this: true*/
		var vm = this;
		vm.topCategories = [];
		main();

		function main() {
			homeFactory.getTopCategories().success(getTopCategoriesSuccess);

			function getTopCategoriesSuccess(res) {
				vm.topCategories = homeFactory.topCategoriesDataReady(res.data);
			}
		}
	}
}());
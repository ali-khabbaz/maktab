(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('TopCategories', TopCategories);

		TopCategories.$inject = ['mainViewFactory', 'homeFactory'];

		function TopCategories(mainViewFactory, homeFactory) {
			/* js hint valid this: true*/
			var vm = this;
			vm.topCategories = [];

			main();

			function main() {
				homeFactory.getTopCategories().success(getTopCategoriesSuccess);

				function getTopCategoriesSuccess(res) {
					vm.topCategories = homeFactory.topCategoriesDataReady(res.data);
					console.log('vm.topCategories', vm.topCategories);
				}
			}
		}
	});
}());
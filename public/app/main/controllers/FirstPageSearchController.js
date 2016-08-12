(function () {
	'use strict';
	angular
		.module('app.main')
		.controller('FirstPageSearchController', FirstPageSearchController);
	/* @ngInject */
	function FirstPageSearchController(homeFactory, $scope, $location) {
		/* js hint valid this: true*/
		var vm = this,
			searchQuery = '';
		vm.list = 'mainviewcontroller loaded';
		vm.searchData = [];
		vm.selectedValue = '';
		vm.keyEventHandler = keyEventHandler;
		vm.inputChanged = inputChanged;
		main();

		function main() {
			getSearchData();
		}

		function getSearchData() {
			homeFactory.getSearchData().then(function (res) {
				if (res[0]) {
					console.log('getSearchDataErrrrrrrr', res[0]);
				} else {
					vm.searchData = res[1];
				}
			});
		}

		function keyEventHandler(event) {
			var keyCode = event.which || event.keyCode;
			if (keyCode === 13) {
				console.log('enter');
				$location.path('/courses/' + searchQuery);
			}
		}
		$scope.$on('selectResult', function (event, data) {
			if (data.originalObject.categoryName) {
				$location.path('/courses/' + data.originalObject.categoryName + '/' +
					data.originalObject.subcategoryName);
			} else if (data.originalObject.name) {
				$location.path('/video/' + data.originalObject.id);
			}
		});

		function inputChanged(value) {
			console.log('input', value); // 'go to search page by value as url parameter'
			searchQuery = value;
		}
	}
}());
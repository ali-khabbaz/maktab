(function () {
	'use strict';
	define(['app'], function (app) {
		app.directive('justTest', justTest);
		app.directive('sameAs', sameAs);
		//sameAs.$inject = ['ngModel'];

		function justTest() {
			return {
				template: '<div>bahbah</div>',
				restrict: 'E',
				link: function (scope, element, attrs) {
					console.log('element');
				}
			};
		}

		function sameAs() {
			return {
				//template: '<div>bahbah</div>',
				//restrict: 'E',
				require:'ngModel',
				link: function (scope, element, attrs, ngModelCtrl) {
				}
			};
		}
	});
}());
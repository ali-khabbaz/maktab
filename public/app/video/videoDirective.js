(function () {
	'use strict';
	define(['app'], function (app) {
		app.directive('dynamicUrl', dynamicUrl);
		dynamicUrl.$inject = ['$q', '$http', '$location', 'mainViewFactory', '$sce'];

		function dynamicUrl(q, http, $location, mvf, $sce) {
			return {
				restrict: 'A',
				link: function postLink(scope, element, attr) {
					console.log('directive', attr.ngSrc);
					scope.$watch('attr.ngSrc', function (val) {
						console.log('changed');
					});
				}
			};
		}
	});
}());
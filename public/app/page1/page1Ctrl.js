(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('page1Ctrl', page1Ctrl);

		function page1Ctrl() {
			var vm = this;
			vm.test_page1 = 'salam page1';
		}
	});
}());
(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('MainViewCtrl', MainViewCtrl);

		MainViewCtrl.$inject = ['mainViewFactory'];

		function MainViewCtrl(mainViewFactory) {
			/* js hint valid this: true*/
			var vm = this;
			vm.list = 'mainviewcontroller loaded';
		}
	});
}());
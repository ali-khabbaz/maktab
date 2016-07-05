(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('FirstPageSignupController', FirstPageSignupController);

		FirstPageSignupController.$inject = ['mainViewFactory'];

		function FirstPageSignupController(mainViewFactory) {
			/* js hint valid this: true*/
			var vm = this;
			vm.list = 'mainviewcontroller loaded';
		}
	});
}());
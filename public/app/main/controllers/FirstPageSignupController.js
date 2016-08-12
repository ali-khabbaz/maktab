(function () {
	'use strict';
	angular
		.module('app.main')
		.controller('FirstPageSignupController', FirstPageSignupController);
	/* @ngInject */
	function FirstPageSignupController(mainViewFactory) {
		/* js hint valid this: true*/
		var vm = this;
		vm.list = 'mainviewcontroller loaded';
	}


}());
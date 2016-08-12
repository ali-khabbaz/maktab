(function () {
	'use strict';
	angular
		.module('app.main')
		.controller('TopCardsController', TopCardsController);
	/* @ngInject */
	function TopCardsController(homeFactory) {
		/* js hint valid this: true*/
		var vm = this;
		vm.mainCards = '';
		vm.topArticles = '';
		main();

		function main() {
			getTopCards();
			getTopArticles();
		}

		function getTopCards() {
			homeFactory.getTopCards().then(function (res) {
				if (res[0]) {
					console.log('getTopCards Error', res[0]);
				} else {
					vm.mainCards = res[1];
					$('main section.main_categories div.big_category')
						.css('background-image', 'url(/css/img/' + vm.mainCards[0].img + ')');
					$('main section.main_categories div.small_category_first')
						.css('background-image', 'url(/css/img/' + vm.mainCards[1].img + ')');
					$('main section.main_categories div.small_category_second')
						.css('background-image', 'url(/css/img/' + vm.mainCards[2].img + ')');
				}
			});
		}

		function getTopArticles() {
			homeFactory.getTopArticles().then(function (res) {
				if (res[0]) {
					console.log('getTopArticles Error', res[0]);
				} else {
					vm.topArticles = res[1];
					console.log('vm.topArticles', vm.topArticles);
				}
			});
		}
	}
}());
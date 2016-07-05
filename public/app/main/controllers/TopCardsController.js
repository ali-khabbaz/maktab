(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('TopCardsController', TopCardsController);

		TopCardsController.$inject = ['mainViewFactory', 'homeFactory'];

		function TopCardsController(mvf, hf) {
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
				hf.getTopCards().then(function (res) {
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
				hf.getTopArticles().then(function (res) {
					if (res[0]) {
						console.log('getTopArticles Error', res[0]);
					} else {
						vm.topArticles = res[1];
						console.log('vm.topArticles', vm.topArticles);
					}
				});
			}
		}
	});
}());
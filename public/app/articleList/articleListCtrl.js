(function () {
	//'use strict';
	define(['app'], function (app) {
		app.controller('articleListCtrl', articleListCtrl);
		articleListCtrl.$inject = ['$http', 'mainViewFactory'];

		function articleListCtrl($http, mainFac) {
			var vm = this;
			vm.article_list_data = '';
			vm.goToArticle = goToArticle;
			getArticleList();

			function getArticleList() {
				var url = mainFac.getApiUrl() + "app/articleList";
				$http.post(url).success(function (res) {
					if (res.err) {
						console.log('err', res.err);
					} else {
						vm.article_list_data = res.data;
					}
				});
			}

			function goToArticle(inp) {
				console.log('>>>>>', inp);
			}
		}
	});
}());
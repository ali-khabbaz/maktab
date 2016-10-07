(function () {
	'use strict';

	angular
		.module('app.main')
		.factory('homeFactory', homeFactory);
	/* @ngInject */
	function homeFactory($q, $http, $location, mainViewFactory, $cacheFactory) {
		var cache = $cacheFactory('dataCache'),
			factory = {
				getTopCards: getTopCards,
				getSearchData: getSearchData,
				getTopCategories: getTopCategories,
				topCategoriesDataReady: topCategoriesDataReady,
				topSubCategoriesDataReady: topSubCategoriesDataReady,
				getArticlesAndSubCategories: getArticlesAndSubCategories,
				counting: counting
			};
		return factory;


		function getTopCards() {
			var url = mainViewFactory.getApiUrl() + 'app/getTopCards',
				dfd = $q.defer();
			$http.post(url).success(function (res) {
				dfd.resolve([null, res.data]);
			}).error(function (err) {
				dfd.resolve([err]);
			});
			return dfd.promise;
		}

		function getSearchData() {
			var url = mainViewFactory.getApiUrl() + 'app/getSearchData',
				dfd = $q.defer(),
				temp = [],
				i;
			/*if (cache.get('search')) {
				dfd.resolve([null, searchData]);
			} else {
				$http({
					url: url,
					method: 'POST'
				}).success(function (res) {
					for (i = 0; i < res.data[0].length; i++) {
						temp.push(res.data[0][i]);
					}
					searchData = temp;
					cache.put('search', searchData);
					dfd.resolve([null, searchData]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
			}*/

			$http({
				url: url,
				method: 'GET',
				cache: true
			}).success(function (res) {
				console.log('search---------', res);
				for(i = 0; i < res.data[0][1].length; i++) {
					temp.push(res.data[0][1][i]);
				}
				dfd.resolve([null, temp]);
			}).error(function (err) {
				dfd.resolve([err]);
			});
			return dfd.promise;
		}

		function getTopCategories() {
			return $http.post(mainViewFactory.getApiUrl() + 'app/getTopCategories');
		}

		function getArticlesAndSubCategories() {
			return $q.all([
				$http.post(mainViewFactory.getApiUrl() + 'app/getTopSubCategories'),
				$http.post(mainViewFactory.getApiUrl() + 'app/getTopArticles'),
				$http.post(mainViewFactory.getApiUrl() + 'app/getBestArticles')
			]);
		}

		function topCategoriesDataReady(data) {
			var i, temp = [];
			for(i = 0; i < data.length; i++) {
				if(temp.length === 0 ||
					data[i].categoryName !== temp[temp.length - 1].categoryName) {
					temp.push({
						categoryName: data[i].categoryName,
						subCategoryNames: [data[i].subCategoryName]
					});
				} else if(data[i].categoryName ===
					temp[temp.length - 1].categoryName) {
					temp[temp.length - 1].subCategoryNames.push(data[i].subCategoryName);
				}
			}
			return temp;
		}

		function topSubCategoriesDataReady(subCategories, articles, best) {
			var i, j;
			subCategories.unshift({
				name: 'Best',
				articles: best
			});
			for(i = 0; i < subCategories.length; i++) {
				if(!subCategories[i].articles) {
					subCategories[i].articles = [];
				}
				for(j = 0; j < articles.length; j++) {
					if(subCategories[i].id === articles[j].subCategoryId) {
						subCategories[i].articles.push(articles[j]);
					}
				}
			}
			return subCategories;
		}

		function counting() {
			return ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم',
				'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم',
				'یازدهم', 'دوازدهم', 'سیزدهم', 'چهاردهم', 'پانزدهم',
				'شانزدهم', 'هفدهم', 'هجدهم', 'نوزدهم', 'بیستم',
				'بیست و یکم', 'بیست و دوم'
			];
		}
	}
}());

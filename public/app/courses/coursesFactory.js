(function () {
	'use strict';
	define(['app'], function (app) {
		app.factory('coursesFactory', coursesFactory);
		coursesFactory.$inject = ['$q', '$http', '$location', '$cacheFactory'];

		function coursesFactory(q, http, $location, $cacheFactory) {
			var cache = $cacheFactory('dataCacheCourses'),
				factory = {
					getBestCourses: getBestCourses,
					getCategoryList: getCategoryList,
					getSelectedArticles: getSelectedArticles,
					getSubCategories: getSubCategories,
					getCategoryAndSubCategoriesAndArticles: getCategoryAndSubCategoriesAndArticles,
					categoryAndSubCategoriesAndArticlesDataReady: categoryAndSubCategoriesAndArticlesDataReady,
					filterArticlesSubCategory: filterArticlesSubCategory,
					getSearchResult: getSearchResult
				};
			return factory;

			function getApiUrl() {
				return $location.absUrl().split('/#/')[0] + '/';
			}

			function getBestCourses(data) {
				var url = getApiUrl() + 'app/getBestCourses',
					dfd = q.defer();
				http.post(url, data).success(function (res) {
					dfd.resolve([null, res.data]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
				return dfd.promise;
			}

			function getSearchResult(data) {
				var dfd = q.defer();
				if (cache.get('searchWord#' + data.searchWord)) {
					dfd.resolve([null, cache.get('searchWord#' + data.searchWord),
						categoryAndSubCategoriesAndArticlesDataReady(cache.get('searchWord#' + data.searchWord))
					]);
				} else {
					http({
						url: getApiUrl() + 'app/getSearchResult',
						method: 'POST',
						data: data
					}).success(function (res) {
						cache.put('searchWord#' + data.searchWord, res.data);
						dfd.resolve([null, res.data,
							categoryAndSubCategoriesAndArticlesDataReady(res.data)
						]);
					}).error(function (err) {
						dfd.resolve([err]);
					});
				}

				return dfd.promise;
			}

			function getCategoryList() {
				var url = getApiUrl() + 'app/getCategoryList',
					dfd = q.defer(),
					i, data = {};
				http.post(url).success(function (res) {
					res = res.data;
					for (i = 0; i < res.length; i++) {
						if (!data[res[i].id]) {
							data[res[i].id] = {
								name: '',
								subCategories: []
							};
						}
						data[res[i].id].name = res[i].name;
						data[res[i].id].subCategories.push(res[i].subname);
					}
					dfd.resolve([null, data]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
				return dfd.promise;
			}

			function getSelectedArticles() {
				var url = getApiUrl() + 'app/getSelectedArticles',
					dfd = q.defer(),
					i, j, data = [],
					temp = {},
					found = false;
				http.post(url).success(function (res) {
					res = res.data;
					for (i = 0; i < res.length; i++) {
						temp = {};
						found = false;
						for (j = 0; j < data.length; j++) {
							if (data[j].categoryName === res[i].name) {
								found = true;
								data[j].videos.push({
									name: res[i].articleName,
									authorName: res[i].author_name,
									duration: res[i].duration,
									like: res[i].like,
									views: res[i].views,
									resourceName: res[i].resource_name,
								});
							}
						}
						if (!found) {
							data.push({
								categoryName: res[i].name,
								videos: [{
									name: res[i].articleName,
									authorName: res[i].author_name,
									duration: res[i].duration,
									like: res[i].like,
									views: res[i].views,
									resourceName: res[i].resource_name,
								}]
							});
						}
					}
					dfd.resolve([null, data]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
				return dfd.promise;
			}

			function getSubCategories(category) {
				var url = getApiUrl() + 'app/getSubCategories',
					dfd = q.defer(),
					data = {
						categoryName: category
					};
				http.post(url, data).success(function (res) {
					res = res.data;
					dfd.resolve([null, res]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
				return dfd.promise;
			}

			function getCategoryAndSubCategoriesAndArticles() {
				return http({
					url: getApiUrl() + 'app/getCategoryAndSubCategoriesAndArticles',
					method: 'GET',
					cache: true
				});
			}

			function categoryAndSubCategoriesAndArticlesDataReady(data) {
				var i, j, temp = [];
				for (i = 0; i < data.length; i++) {
					if (temp.length === 0 ||
						data[i].categoryName !== temp[temp.length - 1].categoryName) {
						temp.push({
							categoryName: data[i].categoryName,
							subCategories: [{
								name: data[i].subCategoryName,
								articles: [{
									name: data[i].articleName,
									id: data[i].articleId,
									duration: data[i].articleDuration,
									insertDate: data[i].articleInsertDate,
									releasedDate: data[i].articleReleaseDate,
									level: data[i].articleLevel,
									author: data[i].articleAuthor,
									resource: data[i].articleResource,
									views: data[i].articleViews,
									likes: data[i].articleLikes
								}]
							}]
						});
					} else if (data[i].categoryName === temp[temp.length - 1].categoryName) {
						if (data[i].subCategoryName ===
							temp[temp.length - 1].subCategories[temp[temp.length - 1].subCategories.length - 1].name) {
							temp[temp.length - 1].subCategories[temp[temp.length - 1].subCategories.length - 1].articles.push({
								name: data[i].articleName,
								id: data[i].articleId,
								duration: data[i].articleDuration,
								insertDate: data[i].articleInsertDate,
								releasedDate: data[i].articleReleaseDate,
								level: data[i].articleLevel,
								author: data[i].articleAuthor,
								resource: data[i].articleResource,
								views: data[i].articleViews,
								likes: data[i].articleLikes
							});
						} else {
							temp[temp.length - 1].subCategories.push({
								name: data[i].subCategoryName,
								articles: [{
									name: data[i].articleName,
									id: data[i].articleId,
									duration: data[i].articleDuration,
									insertDate: data[i].articleInsertDate,
									releasedDate: data[i].articleReleaseDate,
									level: data[i].articleLevel,
									author: data[i].articleAuthor,
									resource: data[i].articleResource,
									views: data[i].articleViews,
									likes: data[i].articleLikes
								}]
							});
						}
					}
				}
				for (i = 0; i < temp.length; i++) {
					temp[i].num = 0;
					for (j = 0; j < temp[i].subCategories.length; j++) {
						temp[i].num += temp[i].subCategories[j].articles.length;
					}
				}
				return temp;
			}

			function filterArticlesSubCategory(data, subCategoryName) {
				var i, temp = [];
				for (i = 0; i < data.length; i++) {
					if (data[i].subCategoryName === subCategoryName) {
						temp.push(data[i]);
					}
				}
				return temp;
			}
		}
	});
}());
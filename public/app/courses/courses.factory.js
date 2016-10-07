(function () {
	'use strict';
	angular
		.module('app.courses')
		.factory('coursesFactory', coursesFactory);
	/* @ngInject */
	function coursesFactory($q, $http, $location, $cacheFactory) {
		var cache = $cacheFactory('dataCacheCourses'),
			factory = {
				getBestCourses: getBestCourses,
				getCategoryList: getCategoryList,
				getSelectedArticles: getSelectedArticles,
				getSubCategories: getSubCategories,
				getCategoryAndSubCategoriesAndArticles: getCategoryAndSubCategoriesAndArticles,
				categoryAndSubCategoriesAndArticlesDataReady: categoryAndSubCategoriesAndArticlesDataReady,
				filterArticlesSubCategory: filterArticlesSubCategory,
				getSearchResult: getSearchResult,
				extractSoftwares: extractSoftwares,
				noFilterSelected: noFilterSelected,
				extractAuthors: extractAuthors,
				extractResources: extractResources,
				extractLevels: extractLevels
			};
		return factory;

		function getApiUrl() {
			return $location.absUrl().split('/#/')[0] + '/';
		}

		function getBestCourses(data) {
			var url = getApiUrl() + 'app/getBestCourses',
				dfd = $q.defer();
			$http.post(url, data).success(function (res) {
				dfd.resolve([null, res.data]);
			}).error(function (err) {
				dfd.resolve([err]);
			});
			return dfd.promise;
		}

		function getSearchResult(data) {
			var dfd = $q.defer();
			if(cache.get('searchParam#' + data.searchParam)) {
				dfd.resolve([null, cache.get('searchParam#' + data.searchParam),
					categoryAndSubCategoriesAndArticlesDataReady(cache.get('searchParam#' + data.searchParam))
				]);
			} else {
				$http({
					url: getApiUrl() + 'app/getSearchResult',
					method: 'POST',
					data: data
				}).success(function (res) {
					cache.put('searchParam#' + data.searchParam, res.data[1]);
					dfd.resolve([null, res.data[1],
						categoryAndSubCategoriesAndArticlesDataReady(res.data[1])
					]);
				}).error(function (err) {
					dfd.resolve([err]);
				});
			}
			return dfd.promise;
		}

		function getCategoryList() {
			var url = getApiUrl() + 'app/getCategoryList',
				dfd = $q.defer(),
				i, data = {};
			$http.post(url).success(function (res) {
				res = res.data;
				for(i = 0; i < res.length; i++) {
					if(!data[res[i].id]) {
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
				dfd = $q.defer(),
				i, j, data = [],
				temp = {},
				found = false;
			$http.post(url).success(function (res) {
				res = res.data;
				for(i = 0; i < res.length; i++) {
					temp = {};
					found = false;
					for(j = 0; j < data.length; j++) {
						if(data[j].categoryName === res[i].name) {
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
					if(!found) {
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
				dfd = $q.defer(),
				data = {
					categoryName: category
				};
			$http.post(url, data).success(function (res) {
				res = res.data;
				dfd.resolve([null, res]);
			}).error(function (err) {
				dfd.resolve([err]);
			});
			return dfd.promise;
		}

		function getCategoryAndSubCategoriesAndArticles() {
			return $http({
				url: getApiUrl() + 'app/getCategoryAndSubCategoriesAndArticles',
				method: 'GET',
				cache: true
			});
		}

		function sortArticlesCategoryAndSubCategory(data) {
			data.sort(function (a, b) {
				a.categoryName = a.categoryName.toLowerCase();
				a.subCategoryName = a.subCategoryName.toLowerCase();
				b.categoryName = b.categoryName.toLowerCase();
				b.subCategoryName = b.subCategoryName.toLowerCase();
				if(a.categoryName > b.categoryName) {
					return 1;
				} else if(a.categoryName < b.categoryName) {
					return -1;
				} else {
					if(a.subCategoryName > b.subCategoryName) {
						return 1;
					} else if(a.subCategoryName < b.subCategoryName) {
						return -1;
					} else {
						return 0;
					}
				}
			});
			return data;
		}

		function categoryAndSubCategoriesAndArticlesDataReady(data) {
			var i, j, temp = [];
			data = sortArticlesCategoryAndSubCategory(data);
			for(i = 0; i < data.length; i++) {
				if(temp.length === 0 ||
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
				} else if(data[i].categoryName === temp[temp.length - 1].categoryName) {
					if(data[i].subCategoryName ===
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
			for(i = 0; i < temp.length; i++) {
				temp[i].num = 0;
				for(j = 0; j < temp[i].subCategories.length; j++) {
					temp[i].num += temp[i].subCategories[j].articles.length;
				}
			}
			return temp;
		}

		function filterArticlesSubCategory(data, subCategoryName) {
			var i, temp = [];
			for(i = 0; i < data.length; i++) {
				if(data[i].subCategoryName === subCategoryName) {
					temp.push(data[i]);
				}
			}
			return temp;
		}

		function extractSoftwares(arr) {
			var temp = [],
				temp2 = [],
				i = null;
			arr = objectSort(arr, 'softwareName');
			for(i = 0; i < arr.length; i++) {
				arr[i].softwareName = arr[i].softwareName.toLowerCase();
				if(temp[temp.length - 1]) {
					if(arr[i].softwareName !== temp[temp.length - 1].name) {
						temp.push({
							name: arr[i].softwareName,
							class: arr[i].softwareName.charAt(0),
							select: false
						});
						temp2.push(arr[i].softwareName);
					}
				} else {
					temp.push({
						name: arr[i].softwareName,
						class: arr[i].softwareName.charAt(0),
						select: false
					});
				}
			}
			return objectSort(temp, 'name');
		}

		function extractAuthors(arr) {
			var temp = [],
				temp2 = [],
				temp3 = null,
				i = null;
			for(i = 0; i < arr.length; i++) {
				if(temp2.indexOf(arr[i].articleAuthor) === -1) {
					if(arr[i].articleAuthor.toLowerCase().indexOf(' and ') > -1) {
						temp3 = arr[i].articleAuthor.toLowerCase().split(' and ');
						temp.push({
							name: temp3[0],
							select: false
						});
						temp.push({
							name: temp3[1],
							select: false
						});
					} else {
						temp.push({
							name: arr[i].articleAuthor.toLowerCase(),
							select: false
						});
					}
					temp2.push(arr[i].articleAuthor);
				}
			}
			return objectSort(temp, 'name');
		}

		function extractResources(arr) {
			var temp = [],
				temp2 = [],
				i = null;
			for(i = 0; i < arr.length; i++) {
				if(temp2.indexOf(arr[i].articleResource) === -1) {
					temp.push({
						name: arr[i].articleResource.toLowerCase(),
						select: false
					});
					temp2.push(arr[i].articleResource);
				}
			}
			return objectSort(temp, 'name');
		}

		function extractLevels(arr) {
			var temp = [],
				temp2 = [],
				i = null;
			for(i = 0; i < arr.length; i++) {
				if(temp2.indexOf(arr[i].articleLevel) === -1) {
					if(arr[i].articleLevel) {
						temp.push({
							name: arr[i].articleLevel.toLowerCase(),
							select: false
						});
						temp2.push(arr[i].articleLevel);
					}
				}
			}
			return objectSort(temp, 'name');
		}

		function objectSort(data, key) {
			data.sort(function (a, b) {
				if(a[key] > b[key]) {
					return 1;
				} else if(a[key] < b[key]) {
					return -1;
				} else {
					return 0;
				}
			});
			return data;
		}

		function noFilterSelected(filter) {
			var i = null,
				key = true;
			for(i = 0; i < filter.length; i++) {
				if(filter[i].select) {
					key = false;
					return key;
				}
			}
			return key;
		}
	}
}());

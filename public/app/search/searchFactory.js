(function () {
	'use strict';
	define(['app'], function (app) {
		app.factory('searchFactory', searchFactory);
		searchFactory.$inject = ['$q', '$http', '$location', 'mainViewFactory', '$sce'];

		function searchFactory(q, http, $location, mvf, $sce) {
			var factory = {
				getArticleInfo: getArticleInfo,
				getSearchResult: getSearchResult
			};
			return factory;

			function getSearchResult(searchQuery) {
				var url = mvf.getApiUrl() + "app/getSearchResult",
					i, temp, articleInfo = [],
					dfd = q.defer();
				http.post(url, {
					searchQuery: searchQuery
				}).success(function (res) {
					if (res.err) {
						dfd.resolve([res.err]);
					} else {
						dfd.resolve([null, res.data]);
					}
				});
				return dfd.promise;
			}

			function getArticleInfo(par) {
				var url = mvf.getApiUrl() + "app/getArticleInfo",
					i, temp, articleInfo = [],
					dfd = q.defer();
				http.post(url, {
					"article_id": par.artId
				}).success(function (res) {
					if (res.err) {
						dfd.resolve([res.err]);
					} else {
						for (i = 0; i < res.data.length; i++) {
							temp = {};
							if (!articleInfo[res.data[i].section_id]) {
								temp.sectionName = res.data[i].section_name;
								temp.sectionId = res.data[i].section_id;
								temp.videos = [];
								temp.videos.push({
									videoId: res.data[i].video_id,
									videoName: res.data[i].video_name,
									duration: res.data[i].duration,
									id: res.data[i].id,
								});
								articleInfo[temp.sectionId] = temp;
							} else {
								temp.videos = [];
								temp.videos.push({
									videoId: res.data[i].video_id,
									videoName: res.data[i].video_name,
									duration: res.data[i].duration
								});
								articleInfo[res.data[i].section_id].videos.push(temp.videos[0]);
							}
						}
						dfd.resolve([null, articleInfo, {
							articleViews: res.data[0].articleViews,
							articleId: res.data[0].article_id,
							authorName: res.data[0].author_name,
							descBig: res.data[0].desc_big,
							descSmall: res.data[0].desc_small,
							duration: res.data[0].duration,
							levelName: res.data[0].level_name,
							like: res.data[0].like,
							name: res.data[0].name,
							releasedDate: res.data[0].released_date,
							resourceName: res.data[0].resource_name,
							categoryName: res.data[0].categoryName,
							subCategoryName: res.data[0].subCategoryName
						}]);
					}
				});
				return dfd.promise;
			}
		}
	});
}());
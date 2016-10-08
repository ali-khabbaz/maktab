(function () {
	'use strict';
	angular
		.module('app.video')
		.factory('videoFactory', videoFactory);
	/* @ngInject */
	function videoFactory($q, $http, $location, mainViewFactory, $sce) {
		var factory = {
			getArticleInfo: getArticleInfo,
			createTrustedUrl: createTrustedUrl,
			getVideoLink: getVideoLink,
			cerateuploadBoyUrl: cerateuploadBoyUrl
		};
		return factory;

		function createTrustedUrl(par, sectionId, videoId) {
			/*console.log('address', mainViewFactory.getApiUrl() +
				'videos/' + par.artId + '/' + sectionId + '/' + videoId + '.mp4');*/
			return $sce.trustAsResourceUrl(mainViewFactory.getApiUrl() +
				'videos/' + par.artId + '/' + sectionId + '/' + videoId + '.mp4');
		}

		function cerateuploadBoyUrl(link) {
			return $sce.trustAsResourceUrl(link);
		}

		function getArticleInfo(par) {
			var url = mainViewFactory.getApiUrl() + "app/getArticleInfo",
				i, temp, articleInfo = [],
				dfd = $q.defer();
			$http.post(url, {
				"article_id": par.artId
			}).success(function (res) {
				if(res.err) {
					dfd.resolve([res.err]);
				} else {
					for(i = 0; i < res.data[0][1].length; i++) {
						temp = {};
						if(!articleInfo[res.data[0][1][i].section_id]) {
							temp.sectionName = res.data[0][1][i].section_name;
							temp.sectionId = res.data[0][1][i].section_id;
							temp.videos = [];
							temp.videos.push({
								videoId: res.data[0][1][i].video_id,
								videoName: res.data[0][1][i].video_name,
								duration: res.data[0][1][i].duration,
								link: res.data[0][1][i].link
							});
							articleInfo[temp.sectionId] = temp;
						} else {
							temp.videos = [];
							temp.videos.push({
								videoId: res.data[0][1][i].video_id,
								videoName: res.data[0][1][i].video_name,
								duration: res.data[0][1][i].duration,
								link: res.data[0][1][i].link
							});
							articleInfo[res.data[0][1][i].section_id].videos.push(temp.videos[0]);
						}
					}
					for(i = 0; i < articleInfo.length; i++) {
						if(!articleInfo[i]) {
							articleInfo.splice(i, 1);
							i--;
						}
					}
					dfd.resolve([null, articleInfo, {
						articleViews: res.data[0][1][0].articleViews,
						articleId: res.data[0][1][0].article_id,
						authorName: res.data[0][1][0].author_name,
						descBig: res.data[0][1][0].desc_big,
						descSmall: res.data[0][1][0].desc_small,
						duration: res.data[0][1][0].duration,
						levelName: res.data[0][1][0].level_name,
						like: res.data[0][1][0].like,
						views: res.data[0][1][0].views,
						name: res.data[0][1][0].name,
						releasedDate: res.data[0][1][0].released_date,
						resourceName: res.data[0][1][0].resource_name,
						categoryName: res.data[0][1][0].categoryName,
						articleDuration: (+(res.data[0][1][0].articleDuration / 60)).toFixed(0),
						subCategoryName: res.data[0][1][0].subCategoryName
					}, res.data[1][1]]);
				}
			});
			return dfd.promise;
		}

		function getVideoLink(htmlLink) {
			return $http({
				url: mainViewFactory.getApiUrl() + 'app/getVideoLink',
				method: 'POST',
				data: {
					link: htmlLink
				}
			});
		}
	}
}());

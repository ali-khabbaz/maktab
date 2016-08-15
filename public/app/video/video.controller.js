(function () {
	'use strict';

	angular
		.module('app.video')
		.controller('videoController', videoController);
	/* @ngInject */
	function videoController(homeFactory, mainViewFactory,
		$routeParams, $sce, videoFactory, $scope) {
		/*jshint validthis:true */
		var vm = this,
			player = null,
			jwPlayer = null;
		vm.current_video_address = '';
		vm.parameter = $routeParams;
		vm.articleInfo = {};
		vm.articleMetadata = '';
		vm.showList = false;
		vm.config = '';
		vm.videoAddress = null;
		vm.count = homeFactory.counting();
		vm.selectedVideo = null;
		vm.selectedSection = null;
		vm.articleVideos = null;
		vm.selectVideo = selectVideo;
		vm.accordion = accordion;
		vm.similarArticles = null;
		main();

		function main() {
			videoFactory.getArticleInfo(vm.parameter).then(getArticleInfoDone);
			//leavePage();
		}

		function getArticleInfoDone(res) {
			if (res[0]) {
				vm.showList = false;
			}
			vm.articleVideos = res[1];
			vm.articleInfo = res[2];
			vm.similarArticles = res[3];
			vm.showList = true;
			selectVideo(1, 1);
		}

		function selectVideo(sectionId, videoId) {
			vm.selectedVideo = videoId;
			vm.selectedSection = sectionId;
			vm.videoAddress = {};
			vm.videoAddress.wmv = mainViewFactory.getApiUrl() +
				'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId + '.wmv';
			vm.videoAddress.mp4 = mainViewFactory.getApiUrl() +
				'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId + '.mp4';
			vm.videoAddress.webm = mainViewFactory.getApiUrl() +
				'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId + '.webm';
			/*if (!player) {
				player = videojs('my-video', {
					techOrder: ['flash', 'html5'],
					//autoplay: true,
					sources: [{
						type: "video/mp4",
						src: vm.videoAddress.mp4
					}]
				});
			} else {
				changeSource(vm.videoAddress);
			}*/
			if (!jwPlayer) {
				jwPlayer = jwplayer('my-video2');
			}
			jwPlayer.setup({
				file: vm.videoAddress.mp4,
				image: "assets/img/articles/" + vm.parameter.artId + "/Main.jpg",
				title: vm.articleVideos[sectionId - 1].videos[videoId - 1].videoName,
				"height": 480,
				"width": 800
			});
		}

		/*function changeSource(src) {
			player.pause();
			player.currentTime(0);
			player.src(src.mp4);
			player.ready(function () {
				this.one('loadeddata', videojs.bind(this, function () {
					this.currentTime(0);
				}));
				this.load();
				this.play();
			});
		}*/

		/*function leavePage() {
			$scope.$on("$destroy", function () {
				videojs('my-video').dispose();
			});
		}*/
		//morteza
		function accordion(event) {
			console.log('event',event);
			var parent = null;
			if ($(event.target).is('h5')) {
				parent = $(event.target).parent();
			} else if ($(event.target).is('span')) {
				parent = $(event.target).closest('header');
			} else if ($(event.target).is('header')) {
				parent = $(event.target);
			}
			if (parent.hasClass('active')) {
				parent.removeClass('active');
				parent.siblings('article').slideUp();
			} else {
				$('header.section_course_header.active').removeClass('active');
				$('article.section_course_accordion').slideUp(700)
				parent.addClass('active');
				parent.siblings('article').slideDown();
			}
		}
	}
}());
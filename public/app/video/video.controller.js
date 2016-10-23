(function () {
	'use strict';

	angular
		.module('app.video')
		.controller('videoController', videoController);
	/* @ngInject */
	function videoController(homeFactory, mainViewFactory, $routeParams, $sce,
		videoFactory, $scope, $window) {
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
		vm.more = more;
		main();

		function main() {
			videoFactory.getArticleInfo(vm.parameter).then(getArticleInfoDone);
			//leavePage();
		}

		function getArticleInfoDone(res) {
			if(res[0]) {
				vm.showList = false;
			}
			vm.articleVideos = res[1];
			vm.articleInfo = res[2];
			vm.similarArticles = res[3];
			vm.showList = true;
			//console.log('vm.articleVideos---', vm.articleVideos);
			selectVideo(1, 1);
		}

		function selectVideo(sectionId, videoId) {
			//console.log('selected', sectionId, videoId);
			vm.selectedVideo = videoId;
			vm.selectedSection = sectionId;
			vm.videoAddress = {};
			console.log('link', vm.articleVideos[(sectionId - 1)].videos[(videoId - 1)]
				.link);
			if(vm.articleVideos[(sectionId - 1)].videos[(videoId - 1)].link !== null) {
				videoFactory.getVideoLink(vm.articleVideos[(sectionId - 1)].videos[(
						videoId - 1)].link)
					.success(function (res) {
						if(!jwPlayer) {
							jwPlayer = jwplayer('my-video2');
						}
						jwPlayer.setup({
							file: res.link.trim(),
							autostart: false,
							image: "assets/img/articles/" + vm.parameter.artId + "/Main.jpg",
							title: vm.articleVideos[sectionId - 1].videos[videoId - 1].videoName,
							"height": 480,
							"width": 800
						});
						//jwplayer().play();
						// $('html,body').animate({
						// 	scrollTop: 0
						// }, 'slow');
					});
			} else {
				vm.videoAddress.wmv = mainViewFactory.getApiUrl() +
					'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId + '.wmv';
				vm.videoAddress.mp4 = mainViewFactory.getApiUrl() +
					'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId + '.mp4';
				vm.videoAddress.webm = mainViewFactory.getApiUrl() +
					'videos/' + vm.parameter.artId + '/' + sectionId + '/' + videoId +
					'.webm';
				if(!jwPlayer) {
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
		}
		//morteza
		function accordion(event) {
			var parent = null;
			if($(event.target).is('h5')) {
				parent = $(event.target).parent();
			} else if($(event.target).is('span')) {
				parent = $(event.target).closest('header');
			} else if($(event.target).is('header')) {
				parent = $(event.target);
			}
			if(parent.hasClass('active')) {
				parent.removeClass('active');
				parent.siblings('article').slideUp();
			} else {
				$('header.section_course_header.active').removeClass('active');
				$('article.section_course_accordion').slideUp(700);
				parent.addClass('active');
				parent.siblings('article').slideDown();
			}
		}

		function more(event) {
			$(event.target).slideUp(900);
		}
	}
}());

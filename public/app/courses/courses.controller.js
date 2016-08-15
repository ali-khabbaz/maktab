(function () {
	'use strict';
	angular
		.module('app.courses')
		.controller('coursesController', coursesController);
	/* @ngInject */
	function coursesController(coursesFactory, $routeParams) {
		/* jshint validthis: true*/
		var vm = this;
		vm.categoryAndSubCategoriesAndArticles = '';
		vm.articles = '';
		vm.selectedSubCategory = '';
		vm.selectSubCategory = selectSubCategory;
		vm.accordion = accordion;
		vm.selectedArticles = '';
		vm.searchWord = $routeParams.searchWord;
		vm.filterCourses = filterCourses;
		vm.softwares = null;
		vm.selectedSoftwares = [];
		vm.loadingShow = true;
		main();
		// morteza
		function main() {
			if (!vm.searchWord) {
				coursesFactory.getCategoryAndSubCategoriesAndArticles()
					.success(function (data) {
						CategoryAndSubCategoriesAndArticlesSuccess(data);
						vm.loadingShow = false;
					});
			} else {
				coursesFactory.getSearchResult({
						searchWord: vm.searchWord
					})
					.then(function (data) {
						getSearchResultSuccess(data);
						vm.loadingShow = false;
					});
			}
		}

		function CategoryAndSubCategoriesAndArticlesSuccess(res) {
			vm.articles = res.data;
			vm.categoryAndSubCategoriesAndArticles =
				coursesFactory.categoryAndSubCategoriesAndArticlesDataReady(res.data);
			vm.softwares = coursesFactory.extractSoftwares(res.data);
		}

		function getSearchResultSuccess(res) {
			vm.articles = res[1];
			vm.softwares = coursesFactory.extractSoftwares(res[1]);
			vm.categoryAndSubCategoriesAndArticles = res[2];
		}

		function accordion(event) {
			if ($(event.target).hasClass('active')) {
				$(event.target).removeClass('active');
				$(event.target).siblings('ul').slideUp();
			} else {
				$('.courses_accordion h4').removeClass('active');
				$('.courses_accordion ul').slideUp(700);
				$(event.target).addClass('active');
				$(event.target).siblings('ul').slideDown(700);
			}
		}

		function selectSubCategory(subCategory) {
			vm.selectedSubCategory = subCategory;
			vm.selectedArticles = coursesFactory.filterArticlesSubCategory(vm.articles, subCategory);
		}

		function filterCourses(inp) {
			var i = null;
			if (!vm.selectedSubCategory || (vm.selectedSubCategory === inp.subCategoryName)) {
				if (coursesFactory.noSoftwareSelected(vm.softwares)) {
					return true;
				} else {
					for (i = 0; i < vm.softwares.length; i++) {
						if (inp.softwareName === vm.softwares[i].name &&
							vm.softwares[i].select) {
							return true;
						}
					}
					return false;
				}
				return true;
			} else {
				return false;
			}
		}
	}
}());
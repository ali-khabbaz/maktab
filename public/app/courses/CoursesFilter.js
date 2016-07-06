(function () {
	'use strict';
	define(['app'], function (app) {
		app.controller('CoursesFilter', CoursesFilter);

		CoursesFilter.$inject = ['coursesFactory', '$routeParams'];

		function CoursesFilter(cf, params) {
			/* js hint valid this: true*/
			var vm = this;
			vm.categoryAndSubCategoriesAndArticles = '';
			vm.articles = '';
			vm.selectedSubCategory = '';
			vm.selectSubCategory = selectSubCategory;
			vm.accordion = accordion;
			vm.selectedArticles = '';
			vm.searchWord = params.searchWord;
			vm.filterCourses = filterCourses;
			vm.softwares = null;
			vm.selectedSoftwares = [];
			main();

			function main() {
				console.log('params------', vm.searchWord);
				if (!vm.searchWord) {
					cf.getCategoryAndSubCategoriesAndArticles()
						.success(CategoryAndSubCategoriesAndArticlesSuccess);
				} else {
					console.log('search-------');
					cf.getSearchResult({
							searchWord: vm.searchWord
						})
						.then(getSearchResultSuccess);
				}
			}

			function CategoryAndSubCategoriesAndArticlesSuccess(res) {
				vm.articles = res.data;
				vm.categoryAndSubCategoriesAndArticles =
					cf.categoryAndSubCategoriesAndArticlesDataReady(res.data);
				vm.softwares = cf.extractSoftwares(res.data);
				console.log('----getCategoryAndSubCategoriesAndArticles----------',
					vm.articles, vm.categoryAndSubCategoriesAndArticles, vm.softwares);
			}

			function getSearchResultSuccess(res) {
				vm.articles = res[1];
				vm.categoryAndSubCategoriesAndArticles = res[2];
				console.log('-----getSearchResultSuccess---------', res);
			}

			function accordion(event) {
				if ($(event.target).hasClass('active')) {
					$(event.target).removeClass('active');
					$(event.target).siblings('ul').slideUp();
				} else {
					$(event.target).addClass('active');
					$(event.target).siblings('ul').slideDown();
				}
			}

			function selectSubCategory(subCategory) {
				vm.selectedSubCategory = subCategory;
				vm.selectedArticles = cf.filterArticlesSubCategory(vm.articles, subCategory);
				console.log('selectedArticles', vm.selectedArticles, vm.selectedArticles);
			}

			function filterCourses(inp) {
				var i = null;
				if (!vm.selectedSubCategory || (vm.selectedSubCategory === inp.subCategoryName)) {
					if (cf.noSoftwareSelected(vm.softwares)) {
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
	});
}());
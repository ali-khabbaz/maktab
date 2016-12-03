(function () {
	'use strict';
	angular
		.module('app.courses')
		.controller('coursesController', coursesController);
	/* @ngInject */
	function coursesController(coursesFactory, $routeParams, mainViewFactory) {
		/* jshint validthis: true*/
		var vm = this;
		vm.categoryAndSubCategoriesAndArticles = '';
		vm.articles = '';
		vm.selectedSubCategory = '';
		vm.selectSubCategory = selectSubCategory;
		vm.accordion = accordion;
		vm.selectedArticles = '';
		vm.searchParam = $routeParams.searchParam;
		vm.softwareParam = $routeParams.software;
		vm.authorParam = $routeParams.author;
		vm.resourceParam = $routeParams.resource;
		vm.levelParam = $routeParams.level;
		vm.filterCourses = filterCourses;
		vm.filterSoftwares = filterSoftwares;
		vm.filterAuthors = filterAuthors;
		vm.softwares = null;
		vm.authors = null;
		vm.resources = null;
		vm.levels = null;
		vm.selectedSoftwares = [];
		vm.loadingShow = true;
		vm.changeSort = changeSort;
		vm.sortFieldOptions = [{
			name: 'نام',
			key: 'articleName'
		}, {
			name: 'مدت',
			key: 'articleDuration'
		}];
		vm.sortOrderOptions = [{
			name: 'صعودی',
			key: 'asc'
		}, {
			name: 'نزولی',
			key: 'desc'
		}];
		vm.selectedSortField = vm.sortFieldOptions[0];
		vm.selectedSortOrder = vm.sortOrderOptions[0];
		vm.filterSoftwareInput = null;
		vm.filterAuthorInput = null;
		main();
		//'beginner,intermediate,advanced,all'.split(',')
		vm.slider_ticks_values = {
			values: 0,
			options: {
				rightToLeft: true,
				readOnly: false,
				disabled: false,
				showTicks: false,
				showTicksValues: true,
				stepsArray: 'beginner,intermediate,advanced,all levels,no level'.split(','),
				onEnd: function (a, b, c, d) {
					var i = 0;
					for (i = 0; i < vm.levels.length; i++) {
						vm.levels[i].select = false;
					}
					if (b === 'intermediate') {
						vm.levels[2].select = true;
					} else if (b === 'advanced') {
						vm.levels[3].select = true;
					} else if (b === 'all levels') {
						vm.levels[1].select = true;
					} else if (b === 'no level') {
						vm.levels[0].select = true;
					}
					console.log('levels----------', b, vm.levels);
				}
			}
		};
		// morteza
		function main() {
			if (!vm.searchParam) {
				coursesFactory.getCategoryAndSubCategoriesAndArticles()
					.success(function (data) {
						CategoryAndSubCategoriesAndArticlesSuccess(data);
						vm.loadingShow = false;
					});
			} else {
				coursesFactory.getSearchResult({
						searchParam: vm.searchParam
					})
					.then(function (data) {
						getSearchResultSuccess(data);
						vm.loadingShow = false;
					});
			}
		}

		function changeSort(field, order) {
			vm.articles = mainViewFactory.objectSort(vm.articles, field, order);
		}

		function filterParamsTrigger() {
			var i = 0;
			if (vm.softwareParam) {
				vm.softwareParam = vm.softwareParam.toLowerCase();
				for (i = 0; i < vm.softwares.length; i++) {
					if (vm.softwares[i].name === vm.softwareParam) {
						vm.softwares[i].select = true;
					}
				}
			}
			if (vm.authorParam) {
				vm.authorParam = vm.authorParam.toLowerCase();
				for (i = 0; i < vm.authors.length; i++) {
					if (vm.authors[i].name === vm.authorParam) {
						vm.authors[i].select = true;
					}
				}
			}
			if (vm.resourceParam) {
				vm.resourceParam = vm.resourceParam.toLowerCase();
				for (i = 0; i < vm.resources.length; i++) {
					if (vm.resources[i].name === vm.resourceParam) {
						vm.resources[i].select = true;
					}
				}
			}
			if (vm.levelParam) {
				vm.levelParam = vm.levelParam.toLowerCase();
				for (i = 0; i < vm.levels.length; i++) {
					if (vm.levels[i].name === vm.levelParam) {
						vm.levels[i].select = true;
					}
				}
			}
		}

		function CategoryAndSubCategoriesAndArticlesSuccess(res) {
			vm.articles = coursesFactory.articlesReady(res.data[1]);
			vm.categoryAndSubCategoriesAndArticles =
				coursesFactory.categoryAndSubCategoriesAndArticlesDataReady(res.data[1]);
			vm.softwares = coursesFactory.extractSoftwares(res.data[1]);
			vm.authors = coursesFactory.extractAuthors(res.data[1]);
			vm.resources = coursesFactory.extractResources(res.data[1]);
			vm.levels = coursesFactory.extractLevels(res.data[1]);
			filterParamsTrigger();
			changeSort(vm.selectedSortField.key, vm.selectedSortOrder.key);
		}

		function getSearchResultSuccess(res) {
			vm.articles = coursesFactory.articlesReady(res[1]);
			vm.softwares = coursesFactory.extractSoftwares(res[1]);
			vm.authors = coursesFactory.extractAuthors(res[1]);
			vm.resources = coursesFactory.extractResources(res[1]);
			vm.levels = coursesFactory.extractLevels(res[1]);
			vm.categoryAndSubCategoriesAndArticles = res[2];
			filterParamsTrigger();
			changeSort(vm.selectedSortField.key, vm.selectedSortOrder.key);
		}

		function accordion(event) {
			if ($(event.target).hasClass('active')) {
				$(event.target).removeClass('active');
				$(event.target).siblings('ul').slideUp();
			} else {
				$('.courses_accordion h4').removeClass('active');
				$('.courses_accordion ul').slideUp();
				$(event.target).addClass('active');
				$(event.target).siblings('ul').slideDown();
			}
		}

		function selectSubCategory(subCategory) {
			vm.selectedSubCategory = subCategory;
			vm.selectedArticles = coursesFactory.filterArticlesSubCategory(vm.articles, subCategory);
		}

		function filterCourses(inp) {
			var i = null,
				category = false,
				software = false,
				author = false,
				resource = false,
				level = false;
			if (!vm.selectedSubCategory) {
				category = true;
			} else if (vm.selectedSubCategory === inp.subCategoryName) {
				category = true;
			}
			if (coursesFactory.noFilterSelected(vm.softwares)) {
				software = true;
			} else {
				for (i = 0; i < vm.softwares.length; i++) {
					if (inp.softwareName.toLowerCase() === vm.softwares[i].name.toLowerCase() &&
						vm.softwares[i].select) {
						software = true;
					}
				}
			}
			if (coursesFactory.noFilterSelected(vm.authors)) {
				author = true;
			} else {
				for (i = 0; i < vm.authors.length; i++) {
					if (inp.articleAuthor.toLowerCase().indexOf(vm.authors[i].name.toLowerCase()) > -1 &&
						vm.authors[i].select) {
						author = true;
					}
				}
			}
			if (coursesFactory.noFilterSelected(vm.resources)) {
				resource = true;
			} else {
				for (i = 0; i < vm.resources.length; i++) {
					if (inp.articleResource.toLowerCase() === vm.resources[i].name.toLowerCase() &&
						vm.resources[i].select) {
						resource = true;
					}
				}
			}
			if (coursesFactory.noFilterSelected(vm.levels)) {
				level = true;
			} else {
				for (i = 0; i < vm.levels.length; i++) {
					if (inp.articleLevel) {
						if (inp.articleLevel.toLowerCase() === vm.levels[i].name.toLowerCase() &&
							vm.levels[i].select) {
							level = true;
						}
					}
				}
			}

			if (category && software && author && resource && level) {
				return true;
			} else {
				return false;
			}
		}

		function filterSoftwares(inp) {
			if (vm.filterSoftwareInput && inp.name.toLowerCase().indexOf(vm.filterSoftwareInput.toLowerCase()) === -1) {
				return false;
			}
			return true;
		}

		function filterAuthors(inp) {
			if (vm.filterAuthorInput && inp.name.toLowerCase().indexOf(vm.filterAuthorInput.toLowerCase()) === -1) {
				return false;
			}
			return true;
		}
	}
}());
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
		vm.searchParam = $routeParams.searchParam;
		vm.softwareParam = $routeParams.software;
		vm.authorParam = $routeParams.author;
		vm.resourceParam = $routeParams.resource;
		vm.levelParam = $routeParams.level;
		vm.filterCourses = filterCourses;
		vm.softwares = null;
		vm.authors = null;
		vm.resources = null;
		vm.levels = null;
		vm.selectedSoftwares = [];
		vm.loadingShow = true;
		vm.changeSort = changeSort;
		vm.sortOptions = [{
			name: 'نام',
			key: 'articleName'
        }, {
			name: 'مدت',
			key: 'articleDuration'
        }];
		// vm.defualt = 100;
		vm.selectedSort = 0;
		main();
		vm.value = 2;
		vm.slider_ticks_values = {
			values: 'advanced',
			options: {
				rightToLeft: true,
				readOnly: false,
				disabled: false,
				showTicks: false,
				showTicksValues: true,
				stepsArray: 'all,beginner,intermediate,advanced'.split(','),
				onEnd: function (id, value) {
					console.log('value', value);
				}
			}
		};
		// morteza
		function main() {
			if(!vm.searchParam) {
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

		function changeSort() {
			console.log('changeSort---', vm.selectedSort);
		}

		function filterParamsTrigger() {
			var i = 0;
			if(vm.softwareParam) {
				vm.softwareParam = vm.softwareParam.toLowerCase();
				for(i = 0; i < vm.softwares.length; i++) {
					if(vm.softwares[i].name === vm.softwareParam) {
						vm.softwares[i].select = true;
					}
				}
			}
			if(vm.authorParam) {
				vm.authorParam = vm.authorParam.toLowerCase();
				for(i = 0; i < vm.authors.length; i++) {
					if(vm.authors[i].name === vm.authorParam) {
						vm.authors[i].select = true;
					}
				}
			}
			if(vm.resourceParam) {
				vm.resourceParam = vm.resourceParam.toLowerCase();
				for(i = 0; i < vm.resources.length; i++) {
					if(vm.resources[i].name === vm.resourceParam) {
						vm.resources[i].select = true;
					}
				}
			}
			if(vm.levelParam) {
				vm.levelParam = vm.levelParam.toLowerCase();
				for(i = 0; i < vm.levels.length; i++) {
					if(vm.levels[i].name === vm.levelParam) {
						vm.levels[i].select = true;
					}
				}
			}
		}

		function CategoryAndSubCategoriesAndArticlesSuccess(res) {
			vm.articles = res.data;
			vm.categoryAndSubCategoriesAndArticles =
				coursesFactory.categoryAndSubCategoriesAndArticlesDataReady(res.data);
			vm.softwares = coursesFactory.extractSoftwares(res.data);
			vm.authors = coursesFactory.extractAuthors(res.data);
			vm.resources = coursesFactory.extractResources(res.data);
			vm.levels = coursesFactory.extractLevels(res.data);
			filterParamsTrigger();
		}

		function getSearchResultSuccess(res) {
			vm.articles = res[1];
			vm.softwares = coursesFactory.extractSoftwares(res[1]);
			vm.authors = coursesFactory.extractAuthors(res[1]);
			vm.resources = coursesFactory.extractResources(res[1]);
			vm.levels = coursesFactory.extractLevels(res[1]);
			vm.categoryAndSubCategoriesAndArticles = res[2];
			filterParamsTrigger();
		}

		function accordion(event) {
			if($(event.target).hasClass('active')) {
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
			var i = null,
				category = false,
				software = false,
				author = false,
				resource = false,
				level = false;
			if(!vm.selectedSubCategory) {
				category = true;
			} else if(vm.selectedSubCategory === inp.subCategoryName) {
				category = true;
			}
			if(coursesFactory.noFilterSelected(vm.softwares)) {
				software = true;
			} else {
				for(i = 0; i < vm.softwares.length; i++) {
					if(inp.softwareName.toLowerCase() === vm.softwares[i].name.toLowerCase() &&
						vm.softwares[i].select) {
						software = true;
					}
				}
			}
			if(coursesFactory.noFilterSelected(vm.authors)) {
				author = true;
			} else {
				for(i = 0; i < vm.authors.length; i++) {
					if(inp.articleAuthor.toLowerCase().indexOf(vm.authors[i].name.toLowerCase()) > -1 &&
						vm.authors[i].select) {
						author = true;
					}
				}
			}
			if(coursesFactory.noFilterSelected(vm.resources)) {
				resource = true;
			} else {
				for(i = 0; i < vm.resources.length; i++) {
					if(inp.articleResource.toLowerCase() === vm.resources[i].name.toLowerCase() &&
						vm.resources[i].select) {
						resource = true;
					}
				}
			}
			if(coursesFactory.noFilterSelected(vm.levels)) {
				level = true;
			} else {
				for(i = 0; i < vm.levels.length; i++) {
					if(inp.articleLevel) {
						if(inp.articleLevel.toLowerCase() === vm.levels[i].name.toLowerCase() &&
							vm.levels[i].select) {
							level = true;
						}
					}
				}
			}

			if(category && software && author && resource && level) {
				return true;
			} else {
				return false;
			}
		}
	}
}());

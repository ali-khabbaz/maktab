function capitalize(){return function(e){function t(e){return e.substring(0,1).toUpperCase()+e.substring(1)}if(e.indexOf(" ")!==-1){var r,a;for(e=e.toLowerCase(),r=e.split(" "),a=0;a<r.length;a++)r[a]=t(r[a]);return r.toString().replace(/,/g," ")}return e=e.toLowerCase(),t(e)}}!function(){"use strict";angular.module("app",["app.core","app.filter","app.main","app.courses","app.video","rzModule","app.directives","ngAnimate"])}(),function(){"use strict";angular.module("app.core",["ngRoute","satellizer","ngAnimate","ngSanitize"])}(),function(){"use strict";angular.module("app.courses",["angularUtils.directives.dirPagination"])}(),function(){"use strict";angular.module("app.filter",[])}(),function(){"use strict";angular.module("app.main",[])}(),function(){"use strict";angular.module("app.video",[])}(),function(){"use strict";function e(e){function t(e){var t=a.getItem("userToken");return t&&(e.headers.authorization="ali is just."+t),e}function r(e){return e}var a=e.localStorage,n={request:t,response:r};return n}e.$inject=["$window"],angular.module("app.core").factory("authInterceptor",e)}(),function(){"use strict";function e(e,t,r){t.config.$routeProvider=e,r.interceptors.push("authInterceptor")}e.$inject=["$routeProvider","routeServiceConfigProvider","$httpProvider"],angular.module("app.core").config(e)}(),function(){"use strict";function e(){this.config={},this.$get=function(){return{config:this.config}}}function t(e,t,r,a,n){function o(e){e.forEach(function(e){var t;"undefined"!=typeof e.config.deps&&0!==e.config.deps.length&&(t={deps:["$ocLazyLoad",function(t){return t.load(e.config.deps)}]},e.config.resolve=angular.extend(e.config.resolve||{},t)),v.when(e.url,e.config),p=e.config.isDefault?e:p}),v.otherwise({redirectTo:p.url||"/"})}function i(e){h=h.concat(e)}function s(){var e,t,a=[];for(e in r.routes)r.routes.hasOwnProperty(e)&&(t=r.routes[e],"undefined"!=typeof t.originalPath&&"undefined"==typeof t.redirectTo&&a.push(t));return a}function l(){return h}function c(){var e=t.$on("$routeChangeStart",function(e,t,r){t&&t.$$route});t.$on("$destroy",e)}function u(){e.path("/logout")}function d(){e.path(p.url||"/")}function g(){var r=t.$on("$routeChangeError",function(t,r,a,n){var o=401===n.status?"دسترسی غیر مجاز":"خطا در تغییر مسیر";logger.error(o,[r,n]),e.path(p.url)});t.$on("$destroy",r)}function m(){g(),c()}var f={configureRoutes:o,configureMenu:i,getRoutes:s,getMenuItems:l,redirectToDefault:d,redirectToLogout:u},p={},h=[],v=n.config.$routeProvider;return m(),f}t.$inject=["$location","$rootScope","$route","$filter","routeServiceConfig"],angular.module("app.core").provider("routeServiceConfig",e).factory("routeService",t)}(),function(){"use strict";function e(e,t,r){function a(){m.searchParam?e.getSearchResult({searchParam:m.searchParam}).then(function(e){s(e),m.loadingShow=!1}):e.getCategoryAndSubCategoriesAndArticles().success(function(e){i(e),m.loadingShow=!1})}function n(e,t){m.articles=r.objectSort(m.articles,e,t)}function o(){var e=0;if(m.softwareParam)for(m.softwareParam=m.softwareParam.toLowerCase(),e=0;e<m.softwares.length;e++)m.softwares[e].name===m.softwareParam&&(m.softwares[e].select=!0);if(m.authorParam)for(m.authorParam=m.authorParam.toLowerCase(),e=0;e<m.authors.length;e++)m.authors[e].name===m.authorParam&&(m.authors[e].select=!0);if(m.resourceParam)for(m.resourceParam=m.resourceParam.toLowerCase(),e=0;e<m.resources.length;e++)m.resources[e].name===m.resourceParam&&(m.resources[e].select=!0);if(m.levelParam)for(m.levelParam=m.levelParam.toLowerCase(),e=0;e<m.levels.length;e++)m.levels[e].name===m.levelParam&&(m.levels[e].select=!0)}function i(t){m.articles=e.articlesReady(t.data[1]),m.categoryAndSubCategoriesAndArticles=e.categoryAndSubCategoriesAndArticlesDataReady(t.data[1]),m.softwares=e.extractSoftwares(t.data[1]),m.authors=e.extractAuthors(t.data[1]),m.resources=e.extractResources(t.data[1]),m.levels=e.extractLevels(t.data[1]),o(),n(m.selectedSortField.key,m.selectedSortOrder.key)}function s(t){m.articles=e.articlesReady(t[1]),m.softwares=e.extractSoftwares(t[1]),m.authors=e.extractAuthors(t[1]),m.resources=e.extractResources(t[1]),m.levels=e.extractLevels(t[1]),m.categoryAndSubCategoriesAndArticles=t[2],o(),n(m.selectedSortField.key,m.selectedSortOrder.key)}function l(e){$(e.target).hasClass("active")?($(e.target).removeClass("active"),$(e.target).siblings("ul").slideUp()):($(".courses_accordion h4").removeClass("active"),$(".courses_accordion ul").slideUp(700),$(e.target).addClass("active"),$(e.target).siblings("ul").slideDown(700))}function c(t){m.selectedSubCategory=t,m.selectedArticles=e.filterArticlesSubCategory(m.articles,t)}function u(t){var r=null,a=!1,n=!1,o=!1,i=!1,s=!1;if(m.selectedSubCategory?m.selectedSubCategory===t.subCategoryName&&(a=!0):a=!0,e.noFilterSelected(m.softwares))n=!0;else for(r=0;r<m.softwares.length;r++)t.softwareName.toLowerCase()===m.softwares[r].name.toLowerCase()&&m.softwares[r].select&&(n=!0);if(e.noFilterSelected(m.authors))o=!0;else for(r=0;r<m.authors.length;r++)t.articleAuthor.toLowerCase().indexOf(m.authors[r].name.toLowerCase())>-1&&m.authors[r].select&&(o=!0);if(e.noFilterSelected(m.resources))i=!0;else for(r=0;r<m.resources.length;r++)t.articleResource.toLowerCase()===m.resources[r].name.toLowerCase()&&m.resources[r].select&&(i=!0);if(e.noFilterSelected(m.levels))s=!0;else for(r=0;r<m.levels.length;r++)t.articleLevel&&t.articleLevel.toLowerCase()===m.levels[r].name.toLowerCase()&&m.levels[r].select&&(s=!0);return!!(a&&n&&o&&i&&s)}function d(e){return!m.filterSoftwareInput||e.name.toLowerCase().indexOf(m.filterSoftwareInput.toLowerCase())!==-1}function g(e){return!m.filterAuthorInput||e.name.toLowerCase().indexOf(m.filterAuthorInput.toLowerCase())!==-1}var m=this;m.categoryAndSubCategoriesAndArticles="",m.articles="",m.selectedSubCategory="",m.selectSubCategory=c,m.accordion=l,m.selectedArticles="",m.searchParam=t.searchParam,m.softwareParam=t.software,m.authorParam=t.author,m.resourceParam=t.resource,m.levelParam=t.level,m.filterCourses=u,m.filterSoftwares=d,m.filterAuthors=g,m.softwares=null,m.authors=null,m.resources=null,m.levels=null,m.selectedSoftwares=[],m.loadingShow=!0,m.changeSort=n,m.sortFieldOptions=[{name:"نام",key:"articleName"},{name:"مدت",key:"articleDuration"}],m.sortOrderOptions=[{name:"صعودی",key:"asc"},{name:"نزولی",key:"desc"}],m.selectedSortField=m.sortFieldOptions[0],m.selectedSortOrder=m.sortOrderOptions[0],m.filterSoftwareInput=null,m.filterAuthorInput=null,a(),m.slider_ticks_values={values:0,options:{rightToLeft:!0,readOnly:!1,disabled:!1,showTicks:!1,showTicksValues:!0,stepsArray:"beginner,intermediate,advanced,all levels,no level".split(","),onEnd:function(e,t,r,a){var n=0;for(n=0;n<m.levels.length;n++)m.levels[n].select=!1;"intermediate"===t?m.levels[2].select=!0:"advanced"===t?m.levels[3].select=!0:"all levels"===t?m.levels[1].select=!0:"no level"===t&&(m.levels[0].select=!0),console.log("levels----------",t,m.levels)}}}}e.$inject=["coursesFactory","$routeParams","mainViewFactory"],angular.module("app.courses").controller("coursesController",e)}(),function(){"use strict";function e(e,t,r,a,n){function o(){return r.absUrl().split("/#/")[0]+"/"}function i(r){var a=o()+"app/getBestCourses",n=e.defer();return t.post(a,r).success(function(e){n.resolve([null,e.data])}).error(function(e){n.resolve([e])}),n.promise}function s(r){var a=e.defer();return S.get("searchParam#"+r.searchParam)?a.resolve([null,S.get("searchParam#"+r.searchParam),m(S.get("searchParam#"+r.searchParam))]):t({url:o()+"app/getSearchResult",method:"POST",data:r}).success(function(e){S.put("searchParam#"+r.searchParam,e.data[1]),a.resolve([null,e.data[1],m(e.data[1])])}).error(function(e){a.resolve([e])}),a.promise}function l(){var r,a=o()+"app/getCategoryList",n=e.defer(),i={};return t.post(a).success(function(e){for(e=e.data,r=0;r<e.length;r++)i[e[r].id]||(i[e[r].id]={name:"",subCategories:[]}),i[e[r].id].name=e[r].name,i[e[r].id].subCategories.push(e[r].subname);n.resolve([null,i])}).error(function(e){n.resolve([e])}),n.promise}function c(){var r,a,n=o()+"app/getSelectedArticles",i=e.defer(),s=[],l={},c=!1;return t.post(n).success(function(e){for(e=e.data,r=0;r<e.length;r++){for(l={},c=!1,a=0;a<s.length;a++)s[a].categoryName===e[r].name&&(c=!0,s[a].videos.push({name:e[r].articleName,authorName:e[r].author_name,duration:e[r].duration,like:e[r].like,views:e[r].views,resourceName:e[r].resource_name}));c||s.push({categoryName:e[r].name,videos:[{name:e[r].articleName,authorName:e[r].author_name,duration:e[r].duration,like:e[r].like,views:e[r].views,resourceName:e[r].resource_name}]})}i.resolve([null,s])}).error(function(e){i.resolve([e])}),i.promise}function u(r){var a=o()+"app/getSubCategories",n=e.defer(),i={categoryName:r};return t.post(a,i).success(function(e){e=e.data,n.resolve([null,e])}).error(function(e){n.resolve([e])}),n.promise}function d(){return t({url:o()+"app/getCategoryAndSubCategoriesAndArticles",method:"GET",cache:!0})}function g(e){return e.sort(function(e,t){return e.categoryName=e.categoryName.toLowerCase(),e.subCategoryName=e.subCategoryName.toLowerCase(),t.categoryName=t.categoryName.toLowerCase(),t.subCategoryName=t.subCategoryName.toLowerCase(),e.categoryName>t.categoryName?1:e.categoryName<t.categoryName?-1:e.subCategoryName>t.subCategoryName?1:e.subCategoryName<t.subCategoryName?-1:0}),e}function m(e){var t,r,a=[];for(e=g(e),t=0;t<e.length;t++)0===a.length||e[t].categoryName!==a[a.length-1].categoryName?a.push({categoryName:e[t].categoryName,categoryPersianName:e[t].categoryPersianName,subCategories:[{name:e[t].subCategoryName,persianName:e[t].subCategoryPersianName,articles:[{name:e[t].articleName,persianName:e[t].articlePersianName,id:e[t].articleId,duration:e[t].articleDuration,insertDate:e[t].articleInsertDate,releasedDate:e[t].articleReleaseDate,level:e[t].articleLevel,author:e[t].articleAuthor,resource:e[t].articleResource,views:e[t].articleViews,likes:e[t].articleLikes}]}]}):e[t].categoryName===a[a.length-1].categoryName&&(e[t].subCategoryName===a[a.length-1].subCategories[a[a.length-1].subCategories.length-1].name?a[a.length-1].subCategories[a[a.length-1].subCategories.length-1].articles.push({name:e[t].articleName,persianName:e[t].articlePersianName,id:e[t].articleId,duration:e[t].articleDuration,insertDate:e[t].articleInsertDate,releasedDate:e[t].articleReleaseDate,level:e[t].articleLevel,author:e[t].articleAuthor,resource:e[t].articleResource,views:e[t].articleViews,likes:e[t].articleLikes}):a[a.length-1].subCategories.push({name:e[t].subCategoryName,persianName:e[t].subCategoryPersianName,articles:[{name:e[t].articleName,persianName:e[t].articlePersianName,id:e[t].articleId,duration:e[t].articleDuration,insertDate:e[t].articleInsertDate,releasedDate:e[t].articleReleaseDate,level:e[t].articleLevel,author:e[t].articleAuthor,resource:e[t].articleResource,views:e[t].articleViews,likes:e[t].articleLikes}]}));for(t=0;t<a.length;t++)for(a[t].num=0,r=0;r<a[t].subCategories.length;r++)a[t].num+=a[t].subCategories[r].articles.length;return a}function f(e,t){var r,a=[];for(r=0;r<e.length;r++)e[r].subCategoryName===t&&a.push(e[r]);return a}function p(e){var t=[],r=[],a=null,o=null;for(a=0;a<e.length;a++){for(r=!0,o=0;o<t.length;o++)e[a].softwareName===t[o].name&&(r=!1);r&&t.push({name:e[a].softwareName,"class":e[a].softwareName.charAt(0),select:!1})}return n.objectSort(t,"name")}function h(e){var t=[],r=[],a=null,o=null;for(o=0;o<e.length;o++)r.indexOf(e[o].articleAuthor)===-1&&(e[o].articleAuthor.toLowerCase().indexOf(" and ")>-1?(a=e[o].articleAuthor.toLowerCase().split(" and "),t.push({name:a[0],select:!1}),t.push({name:a[1],select:!1})):t.push({name:e[o].articleAuthor.toLowerCase(),select:!1}),r.push(e[o].articleAuthor));return n.objectSort(t,"name")}function v(e){var t=[],r=[],a=null;for(a=0;a<e.length;a++)r.indexOf(e[a].articleResource)===-1&&(t.push({name:e[a].articleResource.toLowerCase(),select:!1}),r.push(e[a].articleResource));return n.objectSort(t,"name")}function C(e){var t=[],r=[],a=null;for(a=0;a<e.length;a++)r.indexOf(e[a].articleLevel)===-1&&e[a].articleLevel&&(t.push({name:e[a].articleLevel.toLowerCase(),select:!1}),r.push(e[a].articleLevel));return n.objectSort(t,"name")}function y(e){var t=null,r=!0;for(t=0;t<e.length;t++)if(e[t].select)return r=!1;return r}function w(e){for(var t=0;t<e.length;t++)e[t].articleDuration=+e[t].articleDuration,e[t].articleName=e[t].articleName.toLowerCase();return e}var S=a("dataCacheCourses"),b={getBestCourses:i,getCategoryList:l,getSelectedArticles:c,getSubCategories:u,getCategoryAndSubCategoriesAndArticles:d,categoryAndSubCategoriesAndArticlesDataReady:m,filterArticlesSubCategory:f,getSearchResult:s,extractSoftwares:p,noFilterSelected:y,extractAuthors:h,extractResources:v,extractLevels:C,articlesReady:w};return b}e.$inject=["$q","$http","$location","$cacheFactory","mainViewFactory"],angular.module("app.courses").factory("coursesFactory",e)}(),function(){function e(e){e.configureRoutes(t())}function t(){return[{url:"/courses",config:{templateUrl:"/app/courses/courses.html"}},{url:"/courses/search/:searchParam?",config:{templateUrl:"/app/courses/courses.html"}},{url:"/courses/filter/software/:software?/author/:author?/resource/:resource?/level/:level?",config:{templateUrl:"/app/courses/courses.html"}}]}e.$inject=["routeService"],angular.module("app.courses").run(e)}(),function(){"use strict";angular.module("app.directives",[])}(),function(){"use strict";function e(e){return{restrict:"A",link:function(t,r,a){r.css("background","url('/assets/img/mainBg"+e.randomNumber(1,7)+".jpg')"),r.css("background-size","100%")}}}e.$inject=["mainViewFactory"],angular.module("app.directives").directive("randomBackground",e)}(),function(){"use strict";angular.module("app.directives").directive("customScroll",function(){return{restrict:"AEC",replace:"true",link:function(e,t,r){t.mCustomScrollbar({theme:"minimal-dark",keyboard:{enable:!0}})}}})}(),angular.module("app.filter").filter("capitalize",capitalize),function(){"use strict";function e(e,t,r,a,n){function o(){var r=a.getApiUrl()+"app/getTopCards",n=e.defer();return t.post(r).success(function(e){n.resolve([null,e.data])}).error(function(e){n.resolve([e])}),n.promise}function i(){var r,n=a.getApiUrl()+"app/getSearchData",o=e.defer(),i=[];return t({url:n,method:"GET",cache:!0}).success(function(e){for(r=0;r<e.data[0][1].length;r++)i.push(e.data[0][1][r]);o.resolve([null,i])}).error(function(e){o.resolve([e])}),o.promise}function s(){return t.post(a.getApiUrl()+"app/getTopCategories")}function l(){return e.all([t.post(a.getApiUrl()+"app/getTopSubCategories"),t.post(a.getApiUrl()+"app/getTopArticles"),t.post(a.getApiUrl()+"app/getBestArticles")])}function c(e){var t,r=[];for(t=0;t<e.length;t++)0===r.length||e[t].categoryName!==r[r.length-1].categoryName?r.push({categoryName:e[t].categoryName,subCategoryNames:[e[t].subCategoryName]}):e[t].categoryName===r[r.length-1].categoryName&&r[r.length-1].subCategoryNames.push(e[t].subCategoryName);return r}function u(e,t,r){var a,n;for(e.unshift({name:"Best",persian_name:"بهترین ها",articles:r}),a=0;a<e.length;a++)for(e[a].articles||(e[a].articles=[]),n=0;n<t.length;n++)e[a].id===t[n].subCategoryId&&e[a].articles.push(t[n]);return e}function d(){return["اول","دوم","سوم","چهارم","پنجم","ششم","هفتم","هشتم","نهم","دهم","یازدهم","دوازدهم","سیزدهم","چهاردهم","پانزدهم","شانزدهم","هفدهم","هجدهم","نوزدهم","بیستم","بیست و یکم","بیست و دوم"]}var g=(n("dataCache"),{getTopCards:o,getSearchData:i,getTopCategories:s,topCategoriesDataReady:c,topSubCategoriesDataReady:u,getArticlesAndSubCategories:l,counting:d});return g}e.$inject=["$q","$http","$location","mainViewFactory","$cacheFactory"],angular.module("app.main").factory("homeFactory",e)}(),function(){function e(e){e.configureRoutes(t())}function t(){return[{url:"/main",config:{templateUrl:"/app/main/main.html",isDefault:!0}}]}e.$inject=["routeService"],angular.module("app.main").run(e)}(),function(){"use strict";function e(e,t,r,a,n,o,i){function s(t,o,i,s){function b(e,r){e&&("object"==typeof e?(t.searchStr=R(e),N({originalObject:e})):"string"==typeof e&&e.length>0?t.searchStr=e:console&&console.error&&console.error("Tried to set "+(r?"initial":"")+" value of angucomplete to",e,"which is an invalid value"),F(!0))}function $(e){ge=null,t.hideResults(e),document.body.removeEventListener("click",$)}function A(e){return e.which?e.which:e.keyCode}function N(e){"function"==typeof t.selectedObject?t.selectedObject(e):t.selectedObject=e,F(e?!0:!1)}function I(e){return function(r){return t[e]?t[e](r):r}}function x(e){N({originalObject:e}),t.clearSelected&&(t.searchStr=null),G()}function R(e){return t.titleField.split(",").map(function(t){return D(e,t)}).join(" ")}function D(e,t){var r,a;if(t){r=t.split("."),a=e;for(var n=0;n<r.length;n++)a=a[r[n]]}else a=e;return a}function k(e,r){var n,o,i;if(i=new RegExp(r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),e)return e.match&&e.replace||(e=e.toString()),o=e.match(i),n=o?e.replace(i,'<span class="'+t.matchClass+'">'+o[0]+"</span>"):e,a.trustAsHtml(n)}function F(e){t.notEmpty=e,le=t.searchStr,t.fieldRequired&&s&&t.inputName&&s[t.inputName].$setValidity(se,e)}function L(e){var r=A(e);if(r!==d&&r!==c)if(r===u||r===m)e.preventDefault();else if(r===l)e.preventDefault(),!t.showDropdown&&t.searchStr&&t.searchStr.length>=oe&&(W(),t.searching=!0,K(t.searchStr));else if(r===g)G(),t.$apply(function(){ne.val(t.searchStr)});else{if(0===oe&&!t.searchStr)return;t.searchStr&&""!==t.searchStr?t.searchStr.length>=oe&&(W(),ie&&n.cancel(ie),t.searching=!0,ie=n(function(){K(t.searchStr)},t.pause)):t.showDropdown=!1,le&&le!==t.searchStr&&!t.clearSelected&&t.$apply(function(){N()})}}function P(e){!t.overrideSuggestions||t.selectedObject&&t.selectedObject.originalObject===t.searchStr||(e&&e.preventDefault(),n.cancel(ie),B(),x(t.searchStr))}function j(e){var t=getComputedStyle(e);return e.offsetHeight+parseInt(t.marginTop,10)+parseInt(t.marginBottom,10)}function U(){return ue.getBoundingClientRect().top+parseInt(getComputedStyle(ue).maxHeight,10)}function _(){return o[0].querySelectorAll(".angucomplete-row")[t.currentIndex]}function O(){return _().getBoundingClientRect().top-(ue.getBoundingClientRect().top+parseInt(getComputedStyle(ue).paddingTop,10))}function T(e){ue.scrollTop=ue.scrollTop+e}function V(){var e=t.results[t.currentIndex];t.matchClass?ne.val(R(e.originalObject)):ne.val(e.title)}function q(e){var r=A(e),a=null,n=null;r===m&&t.results?(t.currentIndex>=0&&t.currentIndex<t.results.length?(e.preventDefault(),t.selectResult(t.results[t.currentIndex])):(P(e),G()),t.$apply()):r===l&&t.results?(e.preventDefault(),t.currentIndex+1<t.results.length&&t.showDropdown&&(t.$apply(function(){t.currentIndex++,V()}),de&&(a=_(),U()<a.getBoundingClientRect().bottom&&T(j(a))))):r===u&&t.results?(e.preventDefault(),t.currentIndex>=1?(t.$apply(function(){t.currentIndex--,V()}),de&&(n=O(),n<0&&T(n-1))):0===t.currentIndex&&t.$apply(function(){t.currentIndex=-1,ne.val(t.searchStr)})):r===f?t.results&&t.results.length>0&&t.showDropdown?t.currentIndex===-1&&t.overrideSuggestions?P():(t.currentIndex===-1&&(t.currentIndex=0),t.selectResult(t.results[t.currentIndex]),t.$digest()):t.searchStr&&t.searchStr.length>0&&P():r===g&&e.preventDefault()}function E(e){return function(r,a,n,o){a||n||o||!r.data||(r=r.data),t.searching=!1,Q(D(ee(r),t.remoteUrlDataField),e)}}function H(e,r,a,n){0!==r&&r!==-1&&(r||a||n||(r=e.status),t.remoteUrlErrorCallback?t.remoteUrlErrorCallback(e,r,a,n):console&&console.error&&console.error("http error"))}function B(){ce&&ce.resolve()}function z(a){var n={},o=t.remoteUrl+encodeURIComponent(a);t.remoteUrlRequestFormatter&&(n={params:t.remoteUrlRequestFormatter(a)},o=t.remoteUrl),t.remoteUrlRequestWithCredentials&&(n.withCredentials=!0),B(),ce=e.defer(),n.timeout=ce.promise,r.get(o,n).success(E(a)).error(H)}function M(r){B(),ce=e.defer(),t.remoteApiHandler(r,ce.promise).then(E(r))["catch"](H)}function G(){t.showDropdown=!1,t.results=[],ue&&(ue.scrollTop=0)}function W(){t.showDropdown=re,t.currentIndex=t.focusFirst?0:-1,t.results=[]}function Y(e){var r,a,n,o,i=t.searchFields.split(","),s=[];for("undefined"!=typeof t.parseInput()&&(e=t.parseInput()(e)),r=0;r<t.localData.length;r++){for(a=!1,n=0;n<i.length;n++)o=D(t.localData[r],i[n])||"",a=a||o.toString().toLowerCase().indexOf(e.toString().toLowerCase())>=0;a&&(s[s.length]=t.localData[r])}return s}function J(e,r,a){if(!a)return!1;for(var n in r)if(r[n].toLowerCase()===a.toLowerCase())return t.selectResult(e),!0;return!1}function K(e){!e||e.length<oe||(t.localData?t.$apply(function(){var r;r="undefined"!=typeof t.localSearch()?t.localSearch()(e):Y(e),t.searching=!1,Q(r,e)}):t.remoteApiHandler?M(e):z(e))}function Q(e,r){var a,n,o,i,s,l;if(e&&e.length>0)for(t.results=[],a=0;a<e.length;a++)t.titleField&&""!==t.titleField&&(i=s=R(e[a])),n="",t.descriptionField&&(n=l=D(e[a],t.descriptionField)),o="",t.imageField&&(o=D(e[a],t.imageField)),t.matchClass&&(s=k(i,r),l=k(n,r)),t.results[t.results.length]={title:s,description:l,image:o,originalObject:e[a]};else t.results=[];t.autoMatch&&1===t.results.length&&J(t.results[0],{title:i,desc:n||""},t.searchStr)?t.showDropdown=!1:0!==t.results.length||ae?t.showDropdown=!0:t.showDropdown=!1}function X(){t.localData?Q(t.localData,""):t.remoteApiHandler?M(""):z("")}var Z,ee,te,re,ae,ne=o.find("input"),oe=p,ie=null,se=y,le=null,ce=null,ue=o[0].querySelector(".angucomplete-dropdown"),de=!1,ge=null;o.on("mousedown",function(e){e.target.id?(ge=e.target.id,ge===t.id+"_dropdown"&&document.body.addEventListener("click",$)):ge=e.target.className}),t.currentIndex=t.focusFirst?0:null,t.searching=!1,te=t.$watch("initialValue",function(e){e&&(te(),b(e,!0))}),t.$watch("fieldRequired",function(e,r){e!==r&&(e?F(le&&t.currentIndex!==-1?!0:!1):s[t.inputName].$setValidity(se,!0))}),t.$on("angucomplete-alt:clearInput",function(e,r){r&&r!==t.id||(t.searchStr=null,N(),F(!1),G())}),t.$on("angucomplete-alt:changeInput",function(e,r,a){r&&r===t.id&&b(a)}),t.onFocusHandler=function(){t.focusIn&&t.focusIn(),0!==oe||t.searchStr&&0!==t.searchStr.length||(t.currentIndex=t.focusFirst?0:t.currentIndex,t.showDropdown=!0,X())},t.hideResults=function(){ge&&(ge===t.id+"_dropdown"||ge.indexOf("angucomplete")>=0)?ge=null:(Z=n(function(){G(),t.$apply(function(){t.searchStr&&t.searchStr.length>0&&ne.val(t.searchStr)})},C),B(),t.focusOut&&t.focusOut(),t.overrideSuggestions&&t.searchStr&&t.searchStr.length>0&&t.currentIndex===-1&&P())},t.resetHideResults=function(){Z&&n.cancel(Z)},t.hoverRow=function(e){t.currentIndex=e},t.selectResult=function(e){t.$emit("selectResult",e),t.matchClass&&(e.title=R(e.originalObject),e.description=D(e.originalObject,t.descriptionField)),t.clearSelected?t.searchStr=null:t.searchStr=e.title,N(e),G()},t.inputChangeHandler=function(e){return e.length<oe?(B(),G()):0===e.length&&0===oe&&(t.searching=!1,X()),t.inputChanged&&(e=t.inputChanged(e)),e},t.fieldRequiredClass&&""!==t.fieldRequiredClass&&(se=t.fieldRequiredClass),t.minlength&&""!==t.minlength&&(oe=parseInt(t.minlength,10)),t.pause||(t.pause=v),t.clearSelected||(t.clearSelected=!1),t.overrideSuggestions||(t.overrideSuggestions=!1),t.fieldRequired&&s&&F(t.initialValue?!0:!1),t.inputType=i.type?i.type:"text",t.textSearching=i.textSearching?i.textSearching:w,t.textNoResults=i.textNoResults?i.textNoResults:S,re="false"!==t.textSearching,ae="false"!==t.textNoResults,t.maxlength=i.maxlength?i.maxlength:h,ne.on("keydown",q),ne.on("keyup",L),ee=I("remoteUrlResponseFormatter"),n(function(){var e=getComputedStyle(ue);de=e.maxHeight&&"auto"===e.overflowY})}var l=40,c=39,u=38,d=37,g=27,m=13,f=9,p=3,h=524288,v=500,C=200,y="autocomplete-required",w="Searching...",S="No results found",b="/angucomplete-alt/index.html";return o.put(b,'<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">  <input id="{{id}}_value" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">      <div ng-if="imageField" class="angucomplete-image-holder">        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>      </div>      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>    </div>  </div></div>'),{restrict:"EA",require:"^?form",scope:{selectedObject:"=",disableInput:"=",initialValue:"=",localData:"=",localSearch:"&",remoteUrlRequestFormatter:"=",remoteUrlRequestWithCredentials:"@",remoteUrlResponseFormatter:"=",remoteUrlErrorCallback:"=",remoteApiHandler:"=",id:"@",type:"@",placeholder:"@",remoteUrl:"@",remoteUrlDataField:"@",titleField:"@",descriptionField:"@",imageField:"@",inputClass:"@",pause:"@",searchFields:"@",minlength:"@",matchClass:"@",clearSelected:"@",overrideSuggestions:"@",fieldRequired:"=",fieldRequiredClass:"@",inputChanged:"=",autoMatch:"@",focusOut:"&",focusIn:"&",fieldTabindex:"@",inputName:"@",focusFirst:"@",parseInput:"&"},templateUrl:function(e,t){return t.templateUrl||b},compile:function(e){var t=i.startSymbol(),r=i.endSymbol();if("{{"!==t||"}}"!==r){var a=e.html().replace(/\{\{/g,t).replace(/\}\}/g,r);e.html(a)}return s}}}e.$inject=["$q","$parse","$http","$sce","$timeout","$templateCache","$interpolate"],angular.module("app.main").directive("angucompleteAlt",e)}(),function(){"use strict";function e(e,r){function a(){return r.absUrl().split("/#/")[0]+"/"}function n(e){m=e,p.setItem("userToken",e)}function o(){return m||(m=p.getItem("userToken")),m}function i(){return!!o()}function s(e){i()&&p.setItem("userInfo",e)}function l(){return p.getItem("userInfo")}function c(){m=null,p.removeItem("userToken"),p.removeItem("userInfo")}function u(e){var t=o();return t&&(e.headers.authorization="ali is just"+t),e}function d(e){return e}function g(e,t,r){return e.sort(function(e,a){if(e[t]>a[t]){if("asc"===r)return 1;if("desc"===r)return-1}else{if(!(e[t]<a[t]))return 0;if("asc"===r)return-1;if("desc"===r)return 1}}),e}var m,f={getToken:o,setToken:n,getUser:l,setUser:s,isAuthenticated:i,getApiUrl:a,removeToken:c,request:u,response:d,objectSort:g,randomNumber:t},p=e.localStorage;return f}function t(e,t){return Math.floor(Math.random()*t)+e}e.$inject=["$window","$location"],angular.module("app.main").factory("mainViewFactory",e)}(),function(){"use strict";function e(e,t,r,a,n,o,i){function s(){n.getArticleInfo(g.parameter).then(l)}function l(e){e[0]&&(g.showList=!1),g.articleVideos=e[1],g.articleInfo=e[2],g.similarArticles=e[3],g.showList=!0,c(1,1)}function c(e,r){g.selectedVideo=r,g.selectedSection=e,g.videoAddress={},console.log("link",g.articleVideos[e-1].videos[r-1].link),null!==g.articleVideos[e-1].videos[r-1].link?n.getVideoLink(g.articleVideos[e-1].videos[r-1].link).success(function(t){m||(m=jwplayer("my-video2")),m.setup({file:t.link.trim(),autostart:!1,image:"assets/img/articles/"+g.parameter.artId+"/Main.jpg",title:g.articleVideos[e-1].videos[r-1].videoName,height:480,width:800})}):(g.videoAddress.wmv=t.getApiUrl()+"videos/"+g.parameter.artId+"/"+e+"/"+r+".wmv",g.videoAddress.mp4=t.getApiUrl()+"videos/"+g.parameter.artId+"/"+e+"/"+r+".mp4",g.videoAddress.webm=t.getApiUrl()+"videos/"+g.parameter.artId+"/"+e+"/"+r+".webm",m||(m=jwplayer("my-video2")),m.setup({file:g.videoAddress.mp4,image:"assets/img/articles/"+g.parameter.artId+"/Main.jpg",title:g.articleVideos[e-1].videos[r-1].videoName,height:480,width:800}))}function u(e){var t=null;$(e.target).is("h5")?t=$(e.target).parent():$(e.target).is("span")?t=$(e.target).closest("header"):$(e.target).is("header")&&(t=$(e.target)),t.hasClass("active")?(t.removeClass("active"),t.siblings("article").slideUp()):($("header.section_course_header.active").removeClass("active"),$("article.section_course_accordion").slideUp(700),t.addClass("active"),t.siblings("article").slideDown())}function d(e){var t=null;$(e.target).is("span")&&(t=$(e.target).parent()),t.closest(".course_main_intro_wrapper").css("max-height","none"),t.slideUp(1e3)}var g=this,m=null;g.current_video_address="",g.parameter=r,g.articleInfo={},g.articleMetadata="",g.showList=!1,g.config="",g.videoAddress=null,g.count=e.counting(),g.selectedVideo=null,g.selectedSection=null,g.articleVideos=null,g.selectVideo=c,g.accordion=u,g.similarArticles=null,g.more=d,s()}e.$inject=["homeFactory","mainViewFactory","$routeParams","$sce","videoFactory","$scope","$window"],angular.module("app.video").controller("videoController",e)}(),function(){"use strict";function e(e,t,r,a,n){function o(e,t,r){return n.trustAsResourceUrl(a.getApiUrl()+"videos/"+e.artId+"/"+t+"/"+r+".mp4")}function i(e){return n.trustAsResourceUrl(e)}function s(r){var n,o,i=a.getApiUrl()+"app/getArticleInfo",s=[],l=e.defer();return t.post(i,{article_id:r.artId}).success(function(e){if(e.err)l.resolve([e.err]);else{for(n=0;n<e.data[0][1].length;n++)o={},s[e.data[0][1][n].section_id]?(o.videos=[],o.videos.push({videoId:e.data[0][1][n].video_id,videoName:e.data[0][1][n].video_name,duration:e.data[0][1][n].duration,link:e.data[0][1][n].link}),s[e.data[0][1][n].section_id].videos.push(o.videos[0])):(o.sectionName=e.data[0][1][n].section_name,o.sectionId=e.data[0][1][n].section_id,o.videos=[],o.videos.push({videoId:e.data[0][1][n].video_id,videoName:e.data[0][1][n].video_name,duration:e.data[0][1][n].duration,link:e.data[0][1][n].link}),s[o.sectionId]=o);for(n=0;n<s.length;n++)s[n]||(s.splice(n,1),n--);l.resolve([null,s,{articleViews:e.data[0][1][0].articleViews,articleId:e.data[0][1][0].article_id,authorName:e.data[0][1][0].author_name,descBig:e.data[0][1][0].desc_big,descSmall:e.data[0][1][0].desc_small,duration:e.data[0][1][0].duration,levelName:e.data[0][1][0].level_name,like:e.data[0][1][0].like,views:e.data[0][1][0].views,name:e.data[0][1][0].name,releasedDate:e.data[0][1][0].released_date,resourceName:e.data[0][1][0].resource_name,categoryName:e.data[0][1][0].categoryName,articleDuration:(+(e.data[0][1][0].articleDuration/60)).toFixed(0),subCategoryName:e.data[0][1][0].subCategoryName},e.data[1][1]])}}),l.promise}function l(e){return t({url:a.getApiUrl()+"app/getVideoLink",method:"POST",data:{link:e}})}var c={getArticleInfo:s,createTrustedUrl:o,getVideoLink:l,cerateuploadBoyUrl:i};return c}e.$inject=["$q","$http","$location","mainViewFactory","$sce"],angular.module("app.video").factory("videoFactory",e)}(),function(){function e(e){e.configureRoutes(t())}function t(){return[{url:"/video/:artId",config:{templateUrl:"/app/video/video.html"}}]}e.$inject=["routeService"],angular.module("app.video").run(e)}(),function(){"use strict";function e(e,t,r){function a(){n()}function n(){e.getSearchData().then(function(e){e[0]?console.log("getSearchDataErrrrrrrr",e[0]):s.searchData=e[1]})}function o(e){var t=e.which||e.keyCode;
13===t&&(console.log("enter"),r.path("/courses/search/"+l))}function i(e){console.log("input",e),l=e}var s=this,l="";s.list="mainviewcontroller loaded",s.searchData=[],s.selectedValue="",s.keyEventHandler=o,s.inputChanged=i,a(),t.$on("selectResult",function(e,t){t.originalObject.categoryName?r.path("/courses/"+t.originalObject.categoryName+"/"+t.originalObject.subcategoryName):t.originalObject.name&&r.path("/video/"+t.originalObject.id)})}e.$inject=["homeFactory","$scope","$location"],angular.module("app.main").controller("FirstPageSearchController",e)}(),function(){"use strict";function e(e){var t=this;t.list="mainviewcontroller loaded"}e.$inject=["mainViewFactory"],angular.module("app.main").controller("FirstPageSignupController",e)}(),function(){"use strict";function e(e){function t(){e.getArticlesAndSubCategories().then(function(t){console.log("**********",t[0].data.data[1]),a.topSubCategories=e.topSubCategoriesDataReady(t[0].data.data[1],t[1].data.data[1][0],t[2].data.data[1]),a.loadingshow=!1})}function r(e){a.tab=e}var a=this;a.topSubCategories="",a.tab="Best",a.loadingshow=!0,a.changeTab=r,t()}e.$inject=["homeFactory"],angular.module("app.main").controller("TopArticlesAndSubCategories",e)}(),function(){"use strict";function e(e){function t(){r(),a()}function r(){e.getTopCards().then(function(e){e[0]?console.log("getTopCards Error",e[0]):(n.mainCards=e[1],$("main section.main_categories div.big_category").css("background-image","url(/css/img/"+n.mainCards[0].img+")"),$("main section.main_categories div.small_category_first").css("background-image","url(/css/img/"+n.mainCards[1].img+")"),$("main section.main_categories div.small_category_second").css("background-image","url(/css/img/"+n.mainCards[2].img+")"))})}function a(){e.getTopArticles().then(function(e){e[0]?console.log("getTopArticles Error",e[0]):(n.topArticles=e[1],console.log("vm.topArticles",n.topArticles))})}var n=this;n.mainCards="",n.topArticles="",t()}e.$inject=["homeFactory"],angular.module("app.main").controller("TopCardsController",e)}(),function(){"use strict";function e(e,t){function r(){function e(e){a.topCategories=t.topCategoriesDataReady(e.data)}t.getTopCategories().success(e)}var a=this;a.topCategories=[],r()}e.$inject=["mainViewFactory","homeFactory"],angular.module("app.main").controller("TopCategories",e)}();
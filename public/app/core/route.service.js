(function () {
	'use strict';


	angular.module('app.core')
		.provider('routeServiceConfig', routeServiceConfig)
		.factory('routeService', routeService);

	function routeServiceConfig() {
		/*jshint validthis: true */
		this.config = {
			// These are the properties we need to set
			// $routeProvider: undefined
		};

		this.$get = function () {
			return {
				config: this.config
			};
		};
	}

	/* @ngInject */
	function routeService($location, $rootScope, $route, $filter, routeServiceConfig) {
		var service = {
			configureRoutes: configureRoutes,
			configureMenu: configureMenu,
			getRoutes: getRoutes,
			getMenuItems: getMenuItems,
			redirectToDefault: redirectToDefault,
			redirectToLogout: redirectToLogout
		};

		var defaultRoute = {};
		var menu = [];
		var $routeProvider = routeServiceConfig.config.$routeProvider;

		init();

		return service;

		// ////////////////////////////////////////////////////
		function configureRoutes(routes) {
			routes.forEach(function (route) {
				var deps;
				if (typeof route.config.deps !== 'undefined' && route.config.deps.length !== 0) {
					deps = {
						/* @ngInject */
						deps: function ($ocLazyLoad) {
							return $ocLazyLoad.load(route.config.deps);
						}
					};

					route.config.resolve = angular.extend(route.config.resolve || {}, deps);
				}

				$routeProvider.when(route.url, route.config);

				defaultRoute = route.config.isDefault ? route : defaultRoute;
			});
			$routeProvider.otherwise({
				redirectTo: defaultRoute.url || '/'
			});
		}

		function configureMenu(menuItems) {
			menu = menu.concat(menuItems);
		}

		function getRoutes() {
			var routes = [];
			var prop;
			var route;
			for (prop in $route.routes) {
				if ($route.routes.hasOwnProperty(prop)) {
					route = $route.routes[prop];
					if (typeof route.originalPath !== 'undefined' && typeof route.redirectTo === 'undefined') {
						routes.push(route);
					}
				}
			}
			return routes;
		}

		function getMenuItems() {
			return menu;
		}

		function handleRoutingAccess() {
			/* eslint-disable angular/no-private-call */
			var handler = $rootScope.$on('$routeChangeStart', function (event, next, current) {
				if (next && next.$$route) {
					/* && next.$$route.originalPath !== '/login' */
					//console.log('route------------', next.$$route.roles, next.$$route);
					/*if (!authService.hasAccess(next.$$route.roles)) {
					  if (authService.isAuthenticated()) {
					    if (next.$$route.originalPath === '/login') {
					      redirectToDefault();
					    } else {
					      var msg = 'شما به مسیر درخواست شده دسترسی ندارید';
					      logger.error(msg, next);
					      event.preventDefault();
					    }
					  } else if (next.templateUrl !== 'app/user/login.html') {
					    redirectToLogout();
					  }
					}*/
				}
			});
			$rootScope.$on('$destroy', handler);
			/* eslint-enable angular/no-private-call */
		}

		function redirectToLogout() {
			$location.path('/logout');
			//      $location.path('/login');
		}

		function redirectToDefault() {
			$location.path(defaultRoute.url || '/');
		}

		function handleRoutingErrors() {
			var handler = $rootScope.$on('$routeChangeError', function (event, current, previous, res) {
				var msg = res.status === 401 ? 'دسترسی غیر مجاز' : 'خطا در تغییر مسیر';
				logger.error(msg, [current, res]);
				$location.path(defaultRoute.url);
			});
			$rootScope.$on('$destroy', handler);
		}

		function init() {
			handleRoutingErrors();
			handleRoutingAccess();
		}
	}
})();
(function () {
  'use strict';

  angular
    .module('app.core')
    .config(configure)
    .config(DSconfig)
    // .config(toastrConfig);

  /* @ngInject */
  function configure($logProvider, $routeProvider, routeServiceConfigProvider, $httpProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // Configure the common route provider
    routeServiceConfigProvider.config.$routeProvider = $routeProvider;

    // Set interceptor
    $httpProvider.interceptors.push('interceptor');
  }

  /* @ngInject */
  function DSconfig(DSProvider) {
    DSProvider.defaults.basePath = '/app';
  }

  /* @ngInject */
  // function toastrConfig(toastrConfig) {
  //   angular.extend(toastrConfig, {
  //     allowHtml: true,
  //     closeButton: true,
  //     positionClass: 'toast-bottom-left',
  //     progressBar: true
  //   });
  // }
})();
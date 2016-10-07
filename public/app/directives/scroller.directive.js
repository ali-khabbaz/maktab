(function () {
  'use strict';
  angular.module('app.directives').directive('customScroll', function () {
    return {
      restrict: 'AE',
      replace: 'true',
      link: function (scope, elem, attrs) {
        elem.mCustomScrollbar({
          theme: "minimal-dark"
        });
      }
    };
  });
}());

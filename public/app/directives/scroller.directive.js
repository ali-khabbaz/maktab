(function () {
  'use strict';
  angular.module('app.directives').directive('customScroll', function () {
    return {
      restrict: 'AEC',
      replace: 'true',
      link: function (scope, elem, attrs) {
        elem.mCustomScrollbar({
          theme: "minimal-dark",
          keyboard:{ enable: true }
        });
      }
    };
  });
}());

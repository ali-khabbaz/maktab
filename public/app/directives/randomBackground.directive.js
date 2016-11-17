(function () {
  'use strict';
  angular.module('app.directives').directive('randomBackground', randomBackground);

  function randomBackground(mainViewFactory) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem.css('background', "url('/assets/img/mainBg" + mainViewFactory.randomNumber(1, 7) + ".jpg')");
        elem.css('background-size', "100%");
      }
    };
  }
}());

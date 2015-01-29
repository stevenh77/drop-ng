// Usage:
//
//  <button>
//    <drop classes='drop-theme-arrows-bounce-dark'
//          constrain-to-scroll-parent='true'
//          constrain-to-window='true'
//          open-on='click'
//          position='bottom left'>
//      Rich HTML content here
//    </drop>
// </button>
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'drop-ng';
}
(function () {
  'use strict';

  angular
    .module('drop-ng', [])
    .directive('drop', function ($compile) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          classes: '=?',
          constrainToScrollParent: '=?',
          constrainToWindow: '=?',
          position: '=?',
          openOn: '=?'
        },
        template: '<div><div ng-transclude></div></div>',
        link: function (scope, element, attrs) {
          var drop;
          var target = element[0].parentElement;
          var compiled = $compile(element[0].children[0].innerHTML);

          var initDrop = function() {
            if (drop) {
              drop.destroy();
            }

            if (typeof scope.classes == 'undefined') scope.classes = 'drop-theme-arrows-bounce';
            if (typeof scope.constrainToScrollParent == 'undefined') scope.constrainToScrollParent = true;
            if (typeof scope.constrainToWindow == 'undefined') scope.constrainToWindow = true;
            if (typeof scope.position == 'undefined') scope.position = 'top center';
            if (typeof scope.openOn == 'undefined') scope.openOn = 'click';

            drop = new Drop({
              target: target,
              content: compiled(scope)[0],
              classes: scope.classes,
              constrainToScrollParent: scope.constrainToScrollParent,
              constrainToWindow: scope.constrainToWindow,
              position: scope.position,
              openOn: scope.openOn
            });
          }

          initDrop();

          // clean up element
          element[0].innerHTML = '';

          scope.$watch('classes', function (newValue, oldValue) {
            if (newValue !== oldValue)
              initDrop();
          });

          scope.$watch('constrainToScrollParent', function(newValue, oldValue) {
            if (newValue !== oldValue)
              initDrop();
          });

          scope.$watch('constrainToWindow', function(newValue, oldValue) {
            if (newValue !== oldValue)
              initDrop();
          });

          scope.$watch('position', function(newValue, oldValue) {
            if (newValue !== oldValue)
              initDrop();
          });

          scope.$watch('openOn', function(newValue, oldValue) {
            if (newValue !== oldValue)
              initDrop();
          });

          scope.$on('$destroy', function () {
            if (drop) drop.destroy();
            if (initDrop) initDrop.destroy();
            setTimeout(function () {
                element.remove();
            }, 0);
          });
        }
      }
    });
}());

// Usage:
//
//  <button>
//    <drop classes='drop-theme-arrows-bounce-dark'
//          constrain-to-scroll-parent='true'
//          constrain-to-window='true'
//          open-on='click'
//          position='bottom left'>
//      Rich HTML content here
//      <span drop-close>Click to close</span>
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
        controller: function($scope){
            var _this = this;
            this.drop = null;
            this.focusElement = null;
            this.setFocusElement = function(element){
                this.focusElement = element;
            };
            this.close = function(){
                if (_this.drop){
                    _this.drop.close();
                }
            };       
        },
        link: {
          pre: function(scope, element, attrs, ctrl, transclude){
            transclude(scope.$parent, function(clone, scope) {
              element.append(clone);
            });
          },
          post:function (scope, element, attrs, ctrl) {
            var target = element[0].parentElement;
            var compiled = $compile(element[0].children[0]);
            var dropContent = compiled(scope)[0];
            var initDrop = function() {
              if (ctrl.drop) {
                ctrl.drop.off('open', openHandler);
                ctrl.drop.destroy();                
              }
              if (typeof scope.classes == 'undefined') scope.classes = 'drop-theme-arrows-bounce';
              if (typeof scope.constrainToScrollParent == 'undefined') scope.constrainToScrollParent = true;
              if (typeof scope.constrainToWindow == 'undefined') scope.constrainToWindow = true;
              if (typeof scope.position == 'undefined') scope.position = 'top center';
              if (typeof scope.openOn == 'undefined') scope.openOn = 'click';
                
              ctrl.drop = new Drop({
                target: target,
                content: dropContent,
                classes: scope.classes,
                constrainToScrollParent: scope.constrainToScrollParent,
                constrainToWindow: scope.constrainToWindow,
                position: scope.position,
                openOn: scope.openOn
              });
              
              ctrl.drop.on('open', openHandler);
            }
            
            var openHandler = function(){
                if (ctrl.focusElement){
                    ctrl.focusElement[0].focus();
                }
            }

            initDrop();

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
              if (ctrl.drop){
                  ctrl.drop.off('open', openHandler);
                  ctrl.drop.destroy();
              }
              setTimeout(function () {
                element.remove();
              }, 0);
            });
          }
        }
      }
    })
    .directive('dropClose', function(){
        return {
            require: '^drop',
            restrict: 'A',
            link: function(scope, element, attrs, dropCtrl){
                element.on('click', function(){                
                    dropCtrl.close();
                });
            }
        };
    })
    .directive('dropFocus', function(){
        return {
            require: '^drop',
            restrict: 'A',
            link: function(scope, element, attrs, dropCtrl){
                dropCtrl.setFocusElement(element);
            }
        };
    });
}());

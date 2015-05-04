// Usage:
//
//  <button>
//    <drop classes='drop-theme-arrows-bounce-dark'
//          constrain-to-scroll-parent='true'
//          constrain-to-window='true'
//          open-on='click'
//          position='bottom left'
//			callback-on-open='someFunction()'>
//      Rich HTML content here
//      <span drop-close>Click to close</span>
//    </drop>
// </button>
//
// Notes:
//  dropClosedEvent is broadcast on rootscope when the drop is closed.
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'drop-ng';
}
(function () {
  'use strict';

  angular
    .module('drop-ng', [])
    .directive('drop', function ($compile, $rootScope) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          classes: '=?',
          constrainToScrollParent: '=?',
          constrainToWindow: '=?',
          position: '=?',
          openOn: '=?',
          callbackOnOpen: '&'
        },
        controller: function(){
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
              var dropContents = angular.element('<div class="drop-ng-contents"></div>').append(clone);
              element.append(dropContents);
            });
          },
          post:function (scope, element, attrs, ctrl) {
            var target = element[0].parentElement;            
            var dropContent = element[0].querySelector('.drop-ng-contents');
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

              if (scope.openOn === "contextmenu") {
                angular.element(target).bind('contextmenu', function (e) {
                  e.preventDefault();
                  ctrl.drop.open();
                });

                angular.element(target).bind('click', function (e) {
                  e.preventDefault();
                  ctrl.drop.close();
                });
              }
              
              ctrl.drop.on('open', openHandler);
              ctrl.drop.on('close', closeHandler);
            }
            
            var openHandler = function(){
                if (ctrl.focusElement){
                    ctrl.focusElement[0].focus();
                }
                scope.callbackOnOpen();
            }
            
            var closeHandler = function(){
              // note: emit notifies all scope listeners whereas 
              //  broadcast notifies all scope AND rootscope listeners 
              $rootScope.$broadcast('dropClosedEvent', null);
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
                  ctrl.drop.off('close', closeHandler);
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
    .directive('hyperlink', function(){
      return {
        transclude: true,
        replace: true,
        template: '<a ng-transclude></a>',
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

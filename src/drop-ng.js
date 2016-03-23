// Usage:
//
//  <button>
//    <drop classes='drop-theme-arrows-bounce-dark'
//          constrain-to-scroll-parent='true'
//          constrain-to-window='true'
//          open-on='click'
//          position='bottom left'
//			    callback-on-open='someFunction()'
//          tetherOptions: '{offset: '-50px 0'}'>
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
    .directive('drop',['$compile', '$rootScope', '$timeout', function ($compile, $rootScope, $timeout) {
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
          dropInstance: '=?',
          callbackOnOpen: '&',
          tetherOptions: '=?',
          beforeClose: '&'
        },
        controller: function(){
          var _this = this;
          this.drop = null;
          this.focusElement = null;
          this.focusDelay;

          this.setFocusElement = function(element, delay){
            this.focusElement = element;
            this.focusDelay = delay;
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

              // Apply defaults for both null and undefined.  Note: false is a valid value for tetherOptions.
              if (typeof scope.tetherOptions === 'undefined' || scope.tetherOptions === null) scope.tetherOptions = {};

              var options = {
                target: target,
                content: dropContent,
                classes: scope.classes,
                constrainToScrollParent: scope.constrainToScrollParent,
                constrainToWindow: scope.constrainToWindow,
                position: scope.position,
                openOn: scope.openOn,
                tetherOptions: scope.tetherOptions
              };

              if (typeof scope.beforeClose == 'function') options.beforeClose = scope.beforeClose;

              ctrl.drop = new Drop(options);

              scope.dropInstance = ctrl.drop; // expose drop instance

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
                    $timeout( function() {
                        ctrl.focusElement[0].focus();
                    }, ctrl.focusDelay);
                }
                scope.callbackOnOpen();
				scope.$apply();
            }

            var closeHandler = function(){
              // note: emit notifies all rootscope listeners only whereas
              //  broadcast notifies all rootscope listeners AND scope listeners
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

            scope.$watch('tetherOptions', function(newValue, oldValue) {
              if (newValue !== oldValue)
                initDrop();
            }, true); // watch deeply for changes to any option.

            scope.$on('closeDrop', function(){
                ctrl.close();
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
    }])
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
            scope: {
                dropFocus: '=?'
            },
            link: function(scope, element, attrs, dropCtrl){
                var focusDelay = 150;
                if (scope.dropFocus !== undefined){
                    focusDelay = scope.dropFocus;
                }
                console.log(focusDelay);
                dropCtrl.setFocusElement(element, focusDelay);
            }
        };
    });
}());

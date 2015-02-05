'use strict';

describe('[unit] drop-ng: set focus on open example', function () {

  beforeEach(module('drop-ng'));

  function findDrop() {
    return angular.element(document.body).find('.drop-open');
  }

  function findButton() {
    return angular.element(document.body).find('#button');
  }
  
  it('should appear when parent button is clicked and focusForTarget element should have focus', inject(function ($compile, $rootScope) {

    var scope = $rootScope.$new();

    var element = $compile(
      '<button id="button">set focus on open' +
        '<drop classes="classes" ' +
              'constrain-to-scroll-parent="constrainToScrollParent" ' +
              'constrain-to-window="constrainToWindow" ' +
              'open-on="openOn" ' +
              'position="position">' +
          '<input id="focusForTarget" type="text" drop-focus ng-model="someValue"></input>' +
        '</drop>' +
      '</button>')(scope);
    
    $(element).appendTo($('body'));

    scope.$apply('classes = "drop-theme-arrows-bounce-dark"');
    scope.$apply('constrainToScrollParent = true');
    scope.$apply('constrainToWindow = true');
    scope.$apply('openOn = "click"');
    scope.$apply('position = "bottom center"');
    scope.$apply('someValue = "value from controller"');

    // checking drop doesn't exist yet
    expect(findDrop().length).toBe(0);
    expect(findButton().length).toBe(1);

    // clicking button to open the drop
    findButton()[0].click();
    expect(findDrop().length).toBe(1);

    // check focus has been correctly set
    expect(document.activeElement.id).toEqual('focusForTarget');

    // cleanup
    $(element).remove();
    $('.drop').remove();
  }));
});
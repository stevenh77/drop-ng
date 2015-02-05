'use strict';

describe('[unit] drop-ng: simple example', function () {

  beforeEach(module('drop-ng'));

  function findDrop() {
    return angular.element(document.body).find('.drop-open');
  }

  function findButton() {
    return angular.element(document.body).find('#button');
  }

  function findDropContentText() {
    return angular.element(document.body).find('#displayTextWithinDrop');
  }

  it('should appear when parent button is clicked, display text from controller and close when parent button clicked again', inject(function ($compile, $rootScope) {

    var scope = $rootScope.$new();

    var element = $compile(
      '<button id="button">simple example' +
        '<drop classes="classes" ' +
              'constrain-to-scroll-parent="constrainToScrollParent" ' +
              'constrain-to-window="constrainToWindow" ' +
              'open-on="openOn" ' +
              'position="position">' +
          '<div id="displayTextWithinDrop">' +
                'Hello {{someValue}}' +
          '</div>' +
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

    // check content text from controller
    expect(findDropContentText()[0].innerText).toBe('Hello value from controller');

    // clicking button to close the drop
    findButton()[0].click();
    expect(findDrop().length).toBe(0);

    // cleanup
    $(element).remove();
    $('.drop').remove();
  }));
});
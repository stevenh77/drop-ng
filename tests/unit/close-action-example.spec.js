'use strict';

describe('[unit] drop-ng: close action example', function () {

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

  function findCloseElement() {
    return angular.element(document.body).find('#closeElement');
  }

  it('should appear when parent button is clicked and close when parent button clicked again', inject(function ($compile, $rootScope, $timeout) {
    var element = $compile(
      '<button id="button"> Click me!' +
        '<drop classes="classes" ' +
              'constrain-to-scroll-parent="constrainToScrollParent" ' +
              'constrain-to-window="constrainToWindow" ' +
              'open-on="openOn" ' +
              'position="position">' +
          '<div>' +
            '<div id="displayTextWithinDrop">Hello {{ $parent.someValue }}</div>' +
            '<br />' +
            '<p id="closeElement" drop-close> ' +
              '<i>Click here to close</i> ' +
            '</p>' +
          '</div>' +
        '</drop>' +
      '</button>')($rootScope);
    
    $(element).appendTo($('body'));

    $rootScope.$apply('classes = "drop-theme-arrows-bounce-dark"');
    $rootScope.$apply('constrainToScrollParent = true');
    $rootScope.$apply('constrainToWindow = true');
    $rootScope.$apply('openOn = "click"');
    $rootScope.$apply('position = "bottom center"');
    $rootScope.$apply('someValue = "value from controller"');

    // checking drop doesn't exist yet
    expect(findDrop().length).toBe(0);
    expect(findButton().length).toBe(1);

    // clicking button to open the drop
    findButton()[0].click();
    expect(findDrop().length).toBe(1);

    // check content text from controller
    expect(findDropContentText()[0].innerText).toBe('Hello value from controller');

    // clicking close element to close the drop
    findCloseElement()[0].click();
    expect(findDrop().length).toBe(0);

    // cleanup
    $(element).remove();
  }));
});
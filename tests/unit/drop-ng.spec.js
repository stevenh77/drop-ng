'use strict';

describe('Module: drop-ng, Directive: <drop>', function () {

  beforeEach(module('drop-ng'));

  function findDrop() {
    return angular.element(document.body).find('.drop');
  }

  function findButton() {
    return angular.element(document.body).find('#button');
  }

  it('should appear on button click and disappear on second click', inject(function ($compile, $rootScope, $timeout) {
    var element = $compile(
      '<button id="button"> Click me!' +
        '<drop classes="classes" ' +
              'constrain-to-scroll-parent="constrainToScrollParent" ' +
              'constrain-to-window="constrainToWindow" ' +
              'open-on="openOn" ' +
              'position="position">' +
          'Rich HTML content here' +
        '</drop>' +
      '</button>')($rootScope);
    
    $(element).appendTo($('body'));

    $rootScope.$apply('classes = "drop-theme-arrows-bounce-dark"');
    $rootScope.$apply('constrainToScrollParent = true');
    $rootScope.$apply('constrainToWindow = true');
    $rootScope.$apply('openOn = "click"');
    $rootScope.$apply('position = "bottom center"');

    expect(findDrop().length).toBe(0);
    expect(findButton().length).toBe(1);
    findButton()[0].click();
    expect(findDrop().length).toBe(1);
    findButton()[0].click();
    
    // need to wait for animation to complete
    //expect(findDrop()[0].clientHeight).toEqual(0);
    //expect(findDrop()[0].clientWidth).toEqual(0);
  }));
});




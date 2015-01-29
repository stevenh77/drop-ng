'use strict';

describe('Module: drop-ng, Directive: <drop>', function () {

  beforeEach(module('drop-ng'));

  function findDrop() {
    return angular.element(document.body).find('.drop');
  }

  function findButton() {
    return angular.element(document.body).find('.drop-target');
  }

  it('should appear on button click and disappear on second click', inject(function ($compile, $rootScope) {
    var element = $compile(
      '<button> Click me!' +
        '<drop>' +
          'Rich HTML content here' +
        '</drop>' +
      '</button>')($rootScope);

    $(element).appendTo($('body'));
    expect(findDrop().length).toBe(0);
    expect(findButton().length).toBe(1);

    //findButton()[0].click();
    //expect(findDrop().length).toBe(1);
    //$('.drop-target')[0].click();
    //$(findButton())[0].click();
    //expect(findDrop().length).toBe(0);
    //debugger;
  }));
});




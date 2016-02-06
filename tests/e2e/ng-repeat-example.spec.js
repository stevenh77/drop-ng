/**
 * Setting up protractor and selenium
 *  Install JDK:  http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
 * 	npm install -g protractor
 * 	webdriver-manager update
 *
 * Starting webdriver
 * 	webdriver-manager start
 *
 * Starting the tests
 *  protractor protractor.config.js
 */

describe('[e2e] drop-ng: ng-repeat example', function () {
  it('should appear when parent button is clicked and display 4 items from controller', function() {
    browser.get('/example/ng-repeat');

    // check drop doesn't exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(false);

    // click the parent button
    element(by.css('.drop-target')).click();

    // check drop does exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(true);

    // check 4 links exist
    expect(element.all(by.css('.liForControllerItem')).count()).toEqual(4);
  });
});

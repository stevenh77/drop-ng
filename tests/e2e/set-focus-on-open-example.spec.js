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

describe('[e2e] drop-ng: set focus on open example', function () {
     it('should appear when parent button is clicked and focusForTarget element should have focus', function() {
       browser.get('http://localhost:8080/example/set-focus-on-open');

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);

       // click the parent button
       element(by.css('.drop-target')).click();

       // check drop does exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(true);

       expect(element(by.id('focusForTarget')).getAttribute('id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('id'));
     });
 });

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

describe('drop-ng: simple example', function () {
     it('should appear when parent button is clicked, display text from controller and close when parent button clicked again', function() {
       browser.get('http://localhost:8080/example/simple');

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);

       // click the parent button
       element(by.css('.drop-target')).click();

       // check drop does exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(true);

       expect(element(by.id('displayTextWithinDrop')).getText()).toBe('Hello value from controller');

       // click the parent button again
       //element(by.css('.drop-target')).click();

       // *** NOTE ***** As protractor struggles to click the button when the drop is open,
       // the workaround is press enter as the button currently has focus
       element(by.css('.drop-target')).sendKeys(protractor.Key.ENTER);

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);
     });
 });

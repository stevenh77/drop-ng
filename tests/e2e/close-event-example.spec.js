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

describe('[e2e] drop-ng: close event example', function () {
     it('should appear when parent button is clicked and close when parent button clicked again, check log message was written ', function() {
       browser.get('/example/close-event');

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);

       // click the parent button
       element(by.css('.drop-target')).click();

       // check drop does exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(true);

       //now close it
       // *** NOTE ***** As protractor struggles to click the button when the drop is open,
       // the workaround is press enter as the button currently has focus
       element.all(by.css('.drop-target')).first().sendKeys(protractor.Key.ENTER);

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);

       expect(element(by.id("eventslog")).getText()).toContain("dropClosedEvent fired");
     });
 });

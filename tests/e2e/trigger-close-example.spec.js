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

describe('[e2e] drop-ng: trigger close example', function () {
     it('should appear when clicked and close when checkbox is checked and apply changes is clicked ', function() {
       browser.get('http://localhost:8080/example/trigger-close');

       // check drop doesn't exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);

       // click the parent button
       element(by.css('.drop-target')).click();

       // check drop does exist
       expect(element(by.css('.drop-open')).isPresent()).toBe(true);
       
       //sigh...waiting required for animation
       browser.sleep(300);

       //now try closing it by clicking the apply changes button
       element(by.id('applyChangesButton')).click();
       
       // it should stay open
       expect(element(by.css('.drop-open')).isPresent()).toBe(true);
       
       //Now check the confirmation box
       element(by.id("confirmCheckBox")).click();
       
       //close it again
       element(by.id('applyChangesButton')).click();
       
       // check that it closed
       expect(element(by.css('.drop-open')).isPresent()).toBe(false);
     });
 });

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

describe('[e2e] drop-ng: load on demand example', function () {
  it('should appear when parent button is clicked and display 4 items from controller', function() {
    browser.get('/example/load-on-demand');

    // check drop doesn't exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(false);

    // click the parent button
    element(by.css('.drop-target')).click();

    // check drop does exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(true);

    // check 4 links exist
    expect(element.all(by.css('.linkForControllerItem')).count()).toEqual(4);
  });

  it('should appear when parent button is clicked and display an alert with controller text when a link is clicked', function () {
    browser.get('/example/load-on-demand');

    // check drop doesn't exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(false);

    // click the parent button
    element(by.css('.drop-target')).click();

    // check drop does exist
    expect(element(by.css('.drop-open')).isPresent()).toBe(true);

    element.all(by.css('.linkForControllerItem')).then(function (elements) {
      //click the 3rd link
      elements[2].click();
    });

    // check the text in the alert then close it
    var alertDialog = browser.switchTo().alert();
    expect(alertDialog.getText()).toBe("three");
    alertDialog.dismiss();
  });
});

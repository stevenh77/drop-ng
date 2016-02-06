/**
 * Setting up protractor and selenium
 *  Install JDK:  http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
 *    npm install -g protractor
 *    webdriver-manager update
 *
 * Starting webdriver
 *    webdriver-manager start
 *
 * Starting the tests
 *  protractor protractor.config.js
 */

describe('[e2e] drop-ng: tether options', function () {
    it('should pass tether options through to the drop instance', function () {

        browser.get('/example/tether-options');

        // There's no way I can see to test tether options other than by changing them
        // and seeing that effects of those changes on the drop itself.
        // So... we set the initial value of our tetherOffset to zero.
        element(by.id('tetherOffsetInput')).clear();
        element(by.id('tetherOffsetInput')).sendKeys("0px 0px");

        // check drop doesn't exist
        expect(element(by.css('.drop.drop-open')).isPresent()).toBe(false);

        // click the parent button
        element(by.css('.drop-target')).click();

        // check drop does exist
        expect(element(by.css('.drop.drop-open')).isPresent()).toBe(true);

        //browser.pause();

        // remember this...
        element(by.css('.drop.drop-open')).getLocation().then(function(initialLocation) {

            // *** NOTE ***** As protractor struggles to click the button when the drop is open,
            // the workaround is press enter as the button currently has focus
            element(by.css('.drop-target')).sendKeys(protractor.Key.ENTER);
            // check drop doesn't exist
            expect(element(by.css('.drop.drop-open')).isPresent()).toBe(false);

            // now update our offset and reshow the
            element(by.id('tetherOffsetInput')).clear();
            element(by.id('tetherOffsetInput')).sendKeys("-50px 0px");

            // click the parent button
            element(by.css('.drop-target')).click();

            // check drop does exist
            expect(element(by.css('.drop.drop-open')).isPresent()).toBe(true);

            element(by.css('.drop.drop-open')).getLocation().then(function(newLocation) {
                expect(newLocation.y).toEqual(initialLocation.y + 50);
            });

        });

    });
});

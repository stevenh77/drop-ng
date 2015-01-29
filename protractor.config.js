exports.config = {

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8080',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['./tests/e2e/*.spec.js']

};

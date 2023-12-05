const { chromium, firefox, webkit } = require('playwright-core');

var LaunchOptions = {
  headless: !Boolean(process.env.npm_config_HEADED),
  slowMo:2000
};

exports.invokeBrowser = function () {
  var browserType = process.env.npm_config_BROWSER || 'chrome';

  switch (browserType) {
    case 'chrome':
      return chromium.launch(LaunchOptions);

    case 'webkit':
      return webkit.launch(LaunchOptions);

    case 'firefox':
      return firefox.launch(LaunchOptions);

    case 'debug':
      return chromium.launch({ headless: !true });

    default:
      throw new Error('Please set the proper browser!');
  }
};

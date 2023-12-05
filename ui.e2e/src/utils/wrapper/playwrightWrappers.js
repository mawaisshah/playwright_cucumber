const { page } = require('@playwright/test');
const fixture = require('../../support/pageFixture');
class PlaywrightWrapper {
  constructor(fixture = page ) {}

  async goto(url) {
    await this.page.goto(url, {
      waitUntil: 'load',
    });
  }

  async waitAndClick(locator) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: 'visible',
    });
    await element.click();
  }

  async navigateTo(link) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }
  async clickAndNaviagte(link) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }
}
// Create an instance of the PlaywrightWrapper class
const playwrightInstance = new PlaywrightWrapper();

// Export the instance if needed
module.exports = {playwrightInstance}

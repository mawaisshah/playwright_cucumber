const { When, Then, setDefaultTimeout, Given } = require("@cucumber/cucumber");
const fixture = require("../../support/pageFixture");
const { expect } = require("@playwright/test");
const config = require("../../../config/cucumber");
const { baseURL } = config.default;
const selectors = require("../../support/selectors.json");
const data = require("../../support/data.json");
setDefaultTimeout(20 * 1000);
const { emailValidationMsg, productLabel } = selectors.loginPage;
const { expectedEmailValidation, expectedLabel } = data.login;
Given("a login page", async function () {
  await fixture.page.goto(baseURL);
});
When("user enters {string} and {string}", async function (email, password) {
  await fixture.page.locator("#user-name").type(email);
  await fixture.page.locator("#password").type(password);
  const sumbitBtn = await fixture.page.locator("#login-button");
  await sumbitBtn.click();
});
Then(
  "the login {string} message should be displayed",
  async function (message) {
    if (message === expectedEmailValidation) {
      const emailValidation = await fixture.page.locator(emailValidationMsg);
      const emailValidationText = await emailValidation.textContent();
      expect(emailValidationText).toBe(expectedEmailValidation);
    } else if (message === expectedLabel) {
      const product = await fixture.page.locator(productLabel);
      const productLabelText = await product.textContent();
      expect(productLabelText).toBe(expectedLabel);
    } else {
      throw new Error("Invalid result parameter in the scenario outline");
    }
  }
);

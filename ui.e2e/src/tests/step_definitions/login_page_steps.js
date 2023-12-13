const { When, Then, setDefaultTimeout, Given } = require("@cucumber/cucumber");
const fixture = require("../../support/pageFixture");
const { expect } = require("@playwright/test");
const config = require("../../../config/cucumber");
const { baseURL } = config.default;
const selectors = require("../../support/selectors.json");
const data = require("../../support/data.json");
setDefaultTimeout(20 * 1000);
const {
  emailField,
  passwordField,
  emailValidationMsg,
  productLabel,
  loginBtn,
} = selectors.loginPage;
const { expectedEmailValidation, expectedLabel } = data.loginPage;
Given("a login page", async function () {
  await fixture.page.goto(baseURL);
});
When("user enters {string} and {string}", async function (email, password) {
  await fixture.page.locator(emailField).type(email);
  await fixture.page.locator(passwordField).type(password);
  const sumbitBtn = await fixture.page.locator(loginBtn);
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

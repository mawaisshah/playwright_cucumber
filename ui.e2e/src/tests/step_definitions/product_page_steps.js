const { When, Then, setDefaultTimeout, Given } = require("@cucumber/cucumber");
const fixture = require("../../support/pageFixture");
const { expect } = require("@playwright/test");
const config = require("../../../config/cucumber");
const { baseURL } = config.default;
const selectors = require("../../support/selectors.json");
const data = require("../../support/data.json");
setDefaultTimeout(20 * 1000);
const { emailField, passwordField, loginBtn } = selectors.loginPage;
const { sortDropdown, sortedBy, addToCartBtn, cartIcon, removeBtn } =
  selectors.productPage;
const { email, password } = data.loginPage;
const { number } = data.productPage;
Given("a product page", async function () {
  await fixture.page.goto(baseURL);
  await fixture.page.locator(emailField).type(email);
  await fixture.page.locator(passwordField).type(password);
  const sumbitBtn = await fixture.page.locator(loginBtn);
  await sumbitBtn.click();
});
When("the user clicks on {string}", async function (order) {
  const selectElement = await fixture.page.locator(sortDropdown);
  await selectElement.selectOption({ label: order });
});
When(`the user clicks "Add to cart"`, async function () {
  await fixture.page.locator(addToCartBtn).click();
});
When(`clicks the "Remove"`, async function () {
  await fixture.page.locator(removeBtn).click();
});
Then(
  "the products should be displayed in {string} order",
  async function (order) {
    const selectedOrder = await fixture.page.locator(sortedBy).innerText();
    expect(selectedOrder.trim()).toBe(order);
  }
);
Then("the product should be successfully added to the cart", async function () {
  const cart = await fixture.page.locator(cartIcon);
  expect(await cart.innerText()).toBe(number);
});
Then(
  "the product should be successfully removed from the cart",
  async function () {
    const cart = await fixture.page.locator(cartIcon);
    expect(await cart.isHidden()).toBe(true);
  }
);

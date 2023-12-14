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
const {
  checkoutBtn,
  firstNameField,
  lastNameField,
  postalcodeField,
  continueBtn,
  finishBtn,
  orderSubmitted,
  orderCompleted,
} = selectors.checkoutPage;
const { email, password } = data.loginPage;
const { number } = data.productPage;
const { fName, lName, pCode, completed } = data.checkoutPage;
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
When("proceed to checkout with the selected product", async function () {
  await fixture.page.locator(cartIcon).click();
  await fixture.page.locator(checkoutBtn).click();
  await fixture.page.locator(firstNameField).type(fName);
  await fixture.page.locator(lastNameField).type(lName);
  await fixture.page.locator(postalcodeField).type(pCode);
  await fixture.page.locator(continueBtn).click();
  await fixture.page.locator(finishBtn).click();
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
    // expect(await cart.isHidden()).toBe(true);
    await expect(cart).toBeHidden();
  }
);
Then("the product should be successfully checked out", async function () {
  const order = await fixture.page.locator(orderSubmitted);
  // expect(await order.isHidden()).toBe(false);
  await expect(order).toBeVisible();
  await expect(await fixture.page.locator(orderCompleted)).toHaveText(
    completed
  );
});

const { page, browser } = require("@playwright/test");
module.exports = {
  page: page,
  page1: page,
  browser: browser,
  set(key, value) {
    this[key] = value;
  },

  get(key) {
    return this[key];
  },
};

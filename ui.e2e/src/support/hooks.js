const { AfterAll, BeforeAll, After, Before, Status } = require('@cucumber/cucumber');
let { chromium, page, browser, context, request, expect } = require('@playwright/test');
const { invokeBrowser } = require('.././helper/browsers/broswerManger');
const fixture = require('../support/pageFixture');
const fs = require('fs-extra');
const axios = require('axios');

BeforeAll(async function () {
browser = await invokeBrowser()
fixture.browser=browser
});

// It will trigger for not auth scenarios
Before(async function ({ pickle }) {
  context = await fixture.browser.newContext({
    // recordVideo: {
    //   dir: 'test-results/videos',
    // },
  });
  const page = await context.newPage();
  fixture.page = page;
});


After(async function ({ pickle, result }) {
  let newVideoPath;
  let videoFilePath;
  let img;
  if (result?.status == Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
    // videoFilePath = await fixture.page.video().path();
    // newVideoPath = videoFilePath.replace(/\\(\w)*.webm/g, `\\${pickle.name}.webm`);
  }
  await fixture.page.close();
  await context.close();
  if (result?.status == Status.PASSED) {
    await this.attach(img, 'image/png');
    // await fs.renameSync(videoFilePath, newVideoPath);
    // await this.attach(fs.readFileSync(newVideoPath), 'video/webm');
  }
});
AfterAll(async function () {
  await fixture.browser.close();
});


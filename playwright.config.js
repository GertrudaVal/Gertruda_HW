// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    //launchOptions: { slowMo: 2000 },
  },
};

module.exports = config;

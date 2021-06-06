console.log("[INFO][preRunPuppeteer] Entering");
module.exports = async (browser, context) => {
  // this is not a real login scenario... we need some constants
  // This assumes all you need is a cookie...
  // If you need passwords, then read the link.
  // https://dev.to/checkly/setting-state-using-cookies-1bk

  const {cookiesource} = require('./constantsSiteDetails');
  const puppeteer = require('puppeteer');
  const fs = require('fs');

  // Go to a new page.
  const page = await browser.newPage()

  // Read in the cookie values from cookie.json in this folder.
  const cookies = fs.readFileSync('cookie.json', 'utf8')

  const deserializedCookies = JSON.parse(cookies)

  // Set the cookies
  await page.setCookie(...deserializedCookies)

  // Go to the page to validate (useful in when debugging in headfull mode)
  await page.goto(cookiesource.preRunPuppeteerlink);
  // TODO: Check page loads with 200

  await page.close();
  console.log("[INFO][preRunPuppeteer] Exiting");
};
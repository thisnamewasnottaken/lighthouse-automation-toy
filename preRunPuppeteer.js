// https://dev.to/checkly/setting-state-using-cookies-1bk

console.log("[INFO][preRunPuppeteer] Entering");
module.exports = async (browser, context) => {
  // this is not a real login scenario... we need some constants 
  const {cookiesource} = require('./constantsSiteDetails');
  const puppeteer = require('puppeteer');
  const fs = require('fs');

  // Go to a new page.
  const page = await browser.newPage()

  // Read in the cookie values from cookie.json in this folder.
  const cookies = fs.readFileSync('cookie.json', 'utf8')
    // console.log("[INFO][preRunPuppeteer] Reading cookie! ");
    // console.log(typeof cookies);

  const deserializedCookies = JSON.parse(cookies)
  // TODO: Error handling for when cookie isn't there...
    // console.log("[INFO][preRunPuppeteer] Checkout desearalized stuff types! ");
    // console.log(typeof deserializedCookies);  
    // console.log("[INFO][preRunPuppeteer] Checkout desearalized stuff values! ");
    // console.log(deserializedCookies)

  // Set the cookies
  await page.setCookie(...deserializedCookies)

  // Go to the page to validate (useful in when debugging in headfull mode)
  await page.goto(cookiesource.preRunPuppeteerlink);
  // TODO: Check page loads with 200

  await page.close();
  console.log("[INFO][preRunPuppeteer] Exiting");
};
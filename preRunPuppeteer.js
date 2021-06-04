// https://dev.to/checkly/setting-state-using-cookies-1bk



module.exports = async (browser, context) => {
  // this is not a real login scenario. 
  const page = await browser.newPage();

  await page.goto(sitedetails.cookiesource.cookieurl);
  await page.close();
}


const puppeteer = require('puppeteer')
const fs = require('fs')
const sitedetails = require('./constantsSiteDetails.js')

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://github.com/login')

  await page.waitForNavigation()

  await page.close()
})()
// const fs = require('fs');


module.exports = async (browser, context) => {
  // this is not a real login scenario. 
  const page = await browser.newPage();
  // const cookies = fs.readFileSync('cookie.json', 'utf8');
  // const deserializedCookies = JSON.parse(cookies);
  //document.write (deserializedCookies);
  await page.goto('https://courses.w3schools.com/courses/accessibility-fundamentals');//,
  // await page.setCookie(
  // deserializedCookies  
  // )
  await page.close();
}

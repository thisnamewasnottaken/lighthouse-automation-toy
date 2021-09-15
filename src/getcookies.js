// Yowzer! A little script to extract the URL of interest's cookies from your normal browser.
//
// https://dev.to/rubengmurray/using-cookies-puppeteer-nodejs-to-mirror-a-chrome-profile-on-macos-1l6m
// https://github.com/bertrandom/chrome-cookies-secure#readme
// 
// This uses chrome-cookies-secure, something that's sortof supported...
// Installing chrome cookies secure -- npm i --save chrome-cookies-secure
//
// ... node-gyp is a pain ... just saying
// ... puppeteer is worse than my editor... 

const chrome = require('chrome-cookies-secure');
const {cookiesource} = require('./constantsSiteDetails');

const fs = require('fs');
const url = cookiesource.link;

console.log(url);
chrome.getCookies(url, 'puppeteer', function(err, cookies) {
		const data = JSON.stringify(cookies)
		console.log("[INFO][getcookies] Stringified cookie");
		console.log(data);
		fs.writeFileSync('cookie.json', data, (err) => {
		if (err) {
			throw err;
		}
		console.log("[INFO][getcookies] Cookie for file data is saved.");
	});
});
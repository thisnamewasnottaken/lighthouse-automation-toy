//https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
//lighthouse https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 
//
// TODO:
//      add z-time to report name
//      drop reports in a reports folder

const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const desktop_config = require('./custom-desktop-config.js');
const mobile_config = require('./custom-mobile-config.js');
const { stringify } = require('querystring');


// (async () => {
//   const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  
//   const runnerResult = await lighthouse('https://google.com/', {port: chrome.port} , desktop_config);
//   lighthouse('https://example.com/', {port: 9222}, desktop_config);
//   // `.report` is the HTML report as a string
//   const reportHtml = runnerResult.report;
//   console.log(runnerResult.artifacts.fetchTime)
//   fs.writeFileSync(runnerResult.artifacts.HostFormFactor+'_LightHouseReport.html', reportHtml);

//   // `.lhr` is the Lighthouse Result as a JS object
//   console.log('Report is done for', runnerResult.lhr.finalUrl);
//   console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

//   await chrome.kill();
// })();


mylighthouse(mobile_config);


async function mylighthouse(inputconfig) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  
  const runnerResult = await lighthouse('https://google.com/', {port: chrome.port} , inputconfig);
  lighthouse('https://example.com/', {port: 9222}, inputconfig);
  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  console.log(runnerResult.artifacts.fetchTime)
  fs.writeFileSync(runnerResult.artifacts.HostFormFactor+'_LightHouseReport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log(' 2 Report is done for', runnerResult.lhr.finalUrl);
  console.log('2 Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
  console.log("Completed running with ", json.stringify(inputconfig))
};

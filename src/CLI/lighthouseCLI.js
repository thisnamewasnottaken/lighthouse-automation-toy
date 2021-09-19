//https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
//lighthouse https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 
//
// TODO:
//      add z-time to report name
//      drop reports in a reports folder
'use strict';

const fs = require('fs');
const lighthouse = require('lighthouse');

const chromeLauncher = require('chrome-launcher');
const desktop_config = require('./custom-desktop-config');

(async () => {
  console.log('Starting Desktop Run');
  // Start with headless chrome.
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  // Start Lighthouse run with the default chrome port and the imported desktop config.
  const runnerResult = await lighthouse('https://www.google.com/', {port: chrome.port}, desktop_config);
  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report[0];
  const reportJSON = runnerResult.report[1];
  // Write the report to the local report folder.
  const reportnameHtml = './reports/'+runnerResult.artifacts.settings.formFactor+'_LightHouseReport.html';
  const reportnameJSON = './reports/'+runnerResult.artifacts.settings.formFactor+'_LightHouseReport.json'; 
  //'+runnerResult.artifacts.fetchTime+'.html'
  fs.writeFileSync(reportnameHtml, reportHtml);
  fs.writeFileSync(reportnameJSON, reportJSON);
  await chrome.kill();

})();
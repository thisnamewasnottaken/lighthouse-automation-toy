//https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
//lighthouse https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 
//
// TODO:
//      add z-time to report name.
//      add logic to run multiple configs for each URL.
'use strict';

// IMPORTS
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// Config Constants
const output_desitnation = './reports/';
const theDesktopConfig = require('./custom-desktop-config.js');
const theMobileConfig = require('./custom-mobile-config.js');
const theTabletConfig = require('./custom-tablet-config.js');
const { stringify } = require('querystring');
const urlInput = 'https://www.google.com/';

async function lighthouseCall(theurltotest,theconfigtotest) {
  console.log('Starting Lighthouse Run with URL: ',theurltotest, ' and config : ');
  // Execute Lighthouse Run
  // Start with headless chrome.
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  // Start Lighthouse run with the default chrome port and the imported desktop config.
  // Use a constant to consume results.
  const runnerResult = await lighthouse(theurltotest, {port: chrome.port}, theconfigtotest);
  
  // REPORT WRITING
  
  // The config is assumed to drive two report results in an array.
  // Position 0 is the HTML and Position 1 is the JSON.
  const reportHtml = runnerResult.report[0];
  const reportJSON = runnerResult.report[1];
  
  //Define the report name
  const reportnameHtml = output_desitnation+'_LightHouseReport_'+runnerResult.artifacts.settings.formFactor+'_'+runnerResult.artifacts.fetchTime.replace(/\-|\:/gi, "")+'.html';
  const reportnameJSON = output_desitnation+'_LightHouseReport_'+runnerResult.artifacts.settings.formFactor+'_'+runnerResult.artifacts.fetchTime.replace(/\-|\:/gi, "")+'.json'; 
  
  //Write the report to the report folder.
  console.log("Writing reports")
  fs.writeFileSync(reportnameHtml, reportHtml);
  fs.writeFileSync(reportnameJSON, reportJSON);

  console.log('Killing Chrome');
  await chrome.kill().then(console.log('Completed Lighthouse Run'));
  return runnerResult;
}

lighthouseCall(urlInput,theDesktopConfig);
//lighthouseCall(urlInput,theTabletConfig);
//lighthouseCall(urlInput,theMobileConfig);

// Pre Function format
// (async () => {
//   console.log('Starting Lighthouse Run');
  
//   // Execute Lighthouse Run
//   // Start with headless chrome.
//   const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
//   // Start Lighthouse run with the default chrome port and the imported desktop config.
//   // Use a constant to consume results.
//   const runnerResult = await lighthouse('https://www.google.com/', {port: chrome.port}, desktop_config);
  
//   // REPORT WRITING
  
//   // The config is assumed to drive two report results in an array.
//   // Position 0 is the HTML and Position 1 is the JSON.
//   const reportHtml = runnerResult.report[0];
//   const reportJSON = runnerResult.report[1];
  
//   //Define the report name
//   const reportnameHtml = output_desitnation+'_LightHouseReport_'+runnerResult.artifacts.settings.formFactor+'_'+runnerResult.artifacts.fetchTime.replace(/\-|\:/gi, "")+'.html';
//   const reportnameJSON = output_desitnation+'_LightHouseReport_'+runnerResult.artifacts.settings.formFactor+'_'+runnerResult.artifacts.fetchTime.replace(/\-|\:/gi, "")+'.json'; 
  
//   //Write the report to the report folder.
//   fs.writeFileSync(reportnameHtml, reportHtml);
//   fs.writeFileSync(reportnameJSON, reportJSON);

//   console.log('Killing Chrome');
//   await chrome.kill();

//   console.log('Completed Lighthouse Run');
// })();
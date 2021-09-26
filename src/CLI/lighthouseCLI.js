//https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
//lighthouse https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 
//
// TODO:
//      add z-time to report name.
//      add logic to run multiple configs for each URL.
'use strict';

// IMPORTS
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { promisify } = require('util');
const { writeFile, writeFileSync } = require('fs');
const { stringify } = require('querystring');

// Config Constants
const output_desitnation = './reports/';
const urlInput = 'https://www.google.com/';
const pWriteFile = promisify(writeFile);
const config = require('./custom-desktop-config.js');
const theMobileConfig = require('./custom-mobile-config.js');
const theTabletConfig = require('./custom-tablet-config.js');

// Function to lauch chrome and run lighthouse.
async function launchChromeAndRunLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({chromeFlags: opts.chromeFlags});
  opts.port = chrome.port;
  const { lhr, report } = await lighthouse(url, opts, config);
  await chrome.kill()
  return { lhr, report };
}
// Default Options input to launchChromeAndRunLighthouse
const opts = {
  output: ['html','json'],
  chromeFlags: ['--headless'],
  logLevel: 'info'
};

// Script to run a set of pre-configured configs.
// TODO: 
//  #Turn into a neater function.
//  #Make inputs parameters
//  #build iterator for multiple domains.
(async () => {
  // Desktop Run
  try {
    console.log('Starting Desktop Run')
    const results = await launchChromeAndRunLighthouse(urlInput, opts, config);
    const reportnameHtml = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.html';
    const reportnameJSON = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.json';
    await pWriteFile(reportnameHtml, results.report[0]);
    await pWriteFile(reportnameJSON, results.report[1]);
    console.log('Desktop Run Complete')
  } catch (e) {
    console.log('Desktop Run had an error: ',e);
  };
  try {
    console.log('Starting Mobile Run')
    const results = await launchChromeAndRunLighthouse(urlInput, opts, theMobileConfig);
    const reportnameHtml = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.html';
    const reportnameJSON = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.json';
    await pWriteFile(reportnameHtml, results.report[0]);
    await pWriteFile(reportnameJSON, results.report[1]);
    console.log('Mobile Run Complete')
  } catch (e) {
    console.log('Mobile Run had an error: ',e)
  }
})();
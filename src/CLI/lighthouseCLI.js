// Google's readme
//  https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
// Google's developer blog on lighthouse (ref for output)
//     https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 
// Izifortune's blog on function
//     https://izifortune.com/lighthouse-architecture-demystified/
//


// IMPORTS
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { promisify } = require('util');
const { writeFile, writeFileSync } = require('fs');
const { stringify } = require('querystring');

// CONFIG CONSTANTS
const output_desitnation = './reports/';
const urlInput = 'https://www.google.com/';
const pWriteFile = promisify(writeFile);
const theDesktopConfig = require('./custom-desktop-config.js');
const theMobileConfig = require('./custom-mobile-config.js');
const theTabletConfig = require('./custom-tablet-config.js');

// FUNCTION TO LAUNCH AND RUN CHROME
async function launchChromeAndRunLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({chromeFlags: opts.chromeFlags});
  opts.port = chrome.port;
  const { lhr, report } = await lighthouse(url, opts, config);
  await chrome.kill()
  return { lhr, report };
}

// DEFAULT OPTION
const opts = {
  output: ['html','json'],
  chromeFlags: ['--headless'],
  logLevel: 'info'
};

// FUNCTION
(async () => {

  console.log('Lighthouse Sequence Started')
  // Run test with Desktop configuration
  try {
    console.log('Desktop Run - Started')
    const results = await launchChromeAndRunLighthouse(urlInput, opts, theDesktopConfig);
    const reportnameHtml = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.html';
    const reportnameJSON = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.json';
    console.log('Desktop Run - Writing Reports')
    await pWriteFile(reportnameHtml, results.report[0]);
    await pWriteFile(reportnameJSON, results.report[1]);
    console.log('Desktop Run - Complete')
  } catch (e) {
    console.log('Desktop Run had an error: ',e);
  };
  // Run test with Mobile configuration
  try {
    console.log('Mobile Run - Started')
    const results = await launchChromeAndRunLighthouse(urlInput, opts, theMobileConfig);
    const reportnameHtml = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.html';
    const reportnameJSON = output_desitnation+'_LightHouse_'+results.lhr.lighthouseVersion+'_Report_'+results.lhr.configSettings.formFactor+'_'+results.lhr.fetchTime.replace(/\-|\:/gi, "")+'.json';
    console.log('Mobile Run - Writing Files')
    await pWriteFile(reportnameHtml, results.report[0]);
    await pWriteFile(reportnameJSON, results.report[1]);
    console.log('Mobile Run - Completed')
  } catch (e) {
    console.log('Mobile Run had an error: ',e)
  }
  console.log('Lighthouse Sequence Complete')
})();
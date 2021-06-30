const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const path = require('path/posix');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
        logLevel: 'info', 
        output: 'json',
        onlyCategories: ['performance','accessibility','best-practices'], 
        port: chrome.port
    };
  
  const runnerResult = await lighthouse('https://developers.google.com/web/tools/lighthouse/', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);

  await chrome.kill();
})();

//lighthouse https://developers.google.com/web/tools/lighthouse/ --output "json","html" --config-path ./lighthouseConfig-desktop.js --output-path=./cli_output/ 

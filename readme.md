# Lighthouse Automation Toy

## Project Overview
This is a toy created for anyone to use as starting point for their exploration of using Google's Lighthouse-CI for their automated testing. 

## Installation Instructions
In command line run NPM Install and ensure all modules install correctly

Create the configuration file "constantsSiteDetails.js"
```javascript
'use strict';

// Variables for sourcing cookies from a site you're already logged into.
// getcookies.js uses this for getting it during COOKIE TIME!
var cookiesource = {
    link : 'https://www.somedomainlogin.com/url/to/page/',
};
module.exports = {cookiesource};

```

- Update the configuration in the following files
  - `lighthouserc.json`, 
  - `lighthouseConfig.js`, 
  - `getcookies.js`, and 
  - `preRunPuppeteer.js`
- 
- Run `COOKIE TIME!` npm script to get cookies from current chrome or create cookie.json manually.
- Run `healthcheck` npm script to confirm all the setup work is completed sensibly.
- Run `collect` npm script to see your first results in `./lighthouseci`
- Run the `start` script or alternatively in command line run `lhci server`
- Go to the local host (listed in lighthouserc.json), e.g http://localhost:9001
  -  At this point you'll get a "welcome to Lighthouse CI message
- Run `lhci wizard`

## Operating Instructions

## Key Files and Modules
    .
    ├── constants.js            # constants script for multiple passes
    ├── cookie.json             # Cookie... probably not tracked on git.
    ├── lighthouseConfig.js     # Tools and utilities
    ├── lighthouserc.json
    ├── preRunPuppeteer.js
    └── README.md

## Roadmap
- None

## Contributing
Let's not get ahead of ourselves here.

## Relevant Links
-  [web.dev lighthouse-ci](https://web.dev/lighthouse-ci/)
-  [github lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)
-  [web.dev lighthouse-ci config](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
-  [gurucharan's blog on lighthouse CI](https://www.gurucharan.in/web/nodejs/lighthouse-ci-the-complete-guide-part-1/)
-  [puppeteer](https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md#class-browser)

## License
[MIT](https://choosealicense.com/licenses/mit/)
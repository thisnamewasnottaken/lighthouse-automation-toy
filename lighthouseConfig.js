// Config Constants https://github.com/GoogleChrome/lighthouse/blob/960d2e37a85e16462a00c0a3a596b86da3debb7a/docs/configuration.md
// Config Master    https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md
// Config, Custom   https://github.com/GoogleChrome/lighthouse/blob/master/docs/recipes/custom-audit/custom-config.js
// Passes           https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md#more-examples

const constants = require('./constants.js');
const {cookiesource} = require('./constantsSiteDetails');

'use strict';

 module.exports = {
   // 1. Run your custom tests along with all the default Lighthouse tests.
   extends: 'lighthouse:default',

  settings: {
      onlyCategories: [
          "performance",
          "accessibility",
          "best-practices"
        ]	    
  },
 
  //2. Add gatherer to the default Lighthouse load ('pass') of the page.
   passes: [
    {
      passName: 'defaultPass',
      recordTrace: true,
      useThrottling: true,
      pauseAfterFcpMs: 1000,
      pauseAfterLoadMs: 1000,
      networkQuietThresholdMs: 1000,
      cpuQuietThresholdMs: 1000,
      gatherers: [],
    },
    {
    passName: 'desktopUnthrottledPass',
    recordTrace: true,
    useThrottling: false,
    pauseAfterFcpMs: 1000,
    pauseAfterLoadMs: 1000,
    networkQuietThresholdMs: 1000,
    cpuQuietThresholdMs: 1000,
    gatherers: [],
    formFactor: 'desktop',
    screenEmulation: constants.screenEmulationMetrics.desktop,
    emulatedUserAgent: constants.userAgents.desktop,
    },
    // {
    //   passName: 'desktopThrottledPass',
    //   recordTrace: true,
    //   useThrottling: true,
    //   pauseAfterFcpMs: 1000,
    //   pauseAfterLoadMs: 1000,
    //   networkQuietThresholdMs: 1000,
    //   cpuQuietThresholdMs: 1000,
    //   gatherers: [],
    //   formFactor: 'desktop',
    //   throttling: constants.throttling.desktopDense4G,
    //   screenEmulation: constants.screenEmulationMetrics.desktop,
    //   emulatedUserAgent: constants.userAgents.desktop,
    // },

    ],
 };
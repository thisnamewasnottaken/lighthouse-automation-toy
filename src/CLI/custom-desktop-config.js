'use strict';

const constants = require("lighthouse/lighthouse-core/config/constants.js");

// module.exports = {
//     extends: 'lighthouse:default',
//     settings: {
//       logLevel: 'verbose', 
//       maxWaitForFcp: 15 * 1000,
//       maxWaitForLoad: 35 * 1000,
//       formfactor: 'desktop',
//       // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
//       skipAudits: ['uses-http2'],
//       output: ['html'],
//       onlyCategories: [
//             'performance',
//             'accessibility',
//             'best-practices'
//       ],
//     }
//   };

/** @type {LH.Config.Json} */
const config = {
  extends: 'lighthouse:default',
  settings: {
    logLevel: 'verbose',
    maxWaitForFcp: 15 * 1000,
    maxWaitForLoad: 35 * 1000,
    formFactor: 'desktop',
    throttling: constants.throttling.desktopDense4G,
    screenEmulation: constants.screenEmulationMetrics.desktop,
    emulatedUserAgent: constants.userAgents.desktop,
    // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
    skipAudits: ['uses-http2'],
    output: ['html', 'json'],
    onlyCategories: [
          'performance',
          'accessibility',
          'best-practices'
    ],
  },
};

module.exports = config;
// https://github.com/GoogleChrome/lighthouse/blob/960d2e37a85e16462a00c0a3a596b86da3debb7a/docs/configuration.md

const constants = require('./constants.js');

const config = {
   extends: 'lighthouse:default',
   settings: {
      formFactor: 'desktop',
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
      onlyCategories: [
          "performance",
          "accessibility",
          "best-practices"
        ]	    
      }
 };
 module.exports = config;
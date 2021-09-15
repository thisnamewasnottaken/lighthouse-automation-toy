const constants = require("lighthouse/lighthouse-core/config/constants");

module.exports = {
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
      output: 'html',
      onlyCategories: [
            'performance',
            'accessibility',
            'best-practices'
      ],
    }
  };
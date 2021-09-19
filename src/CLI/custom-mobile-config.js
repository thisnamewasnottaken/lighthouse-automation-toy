const constants = require("lighthouse/lighthouse-core/config/constants");

module.exports = {
    extends: 'lighthouse:default',
    settings: {
      logLevel: 'verbose', 
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
      emulatedFormFactor: ['mobile'],



      // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
      skipAudits: ['uses-http2'],
      audits: [
        'metrics/first-contentful-paint-3g',
      ],
      output: 'html',
      onlyCategories: [
            'performance',
            'accessibility',
            'best-practices'
      ],
    }
  };
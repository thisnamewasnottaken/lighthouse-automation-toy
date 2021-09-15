// Config Constants https://github.com/GoogleChrome/lighthouse/blob/960d2e37a85e16462a00c0a3a596b86da3debb7a/docs/configuration.md
// Config Master    https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md
// Config, Custom   https://github.com/GoogleChrome/lighthouse/blob/master/docs/recipes/custom-audit/custom-config.js
// Passes           https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md#more-examples
// More passes      https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/lr-mobile-config.js

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
        "best-practices",
    ],
    maxWaitForFcp: 15 * 1000,
    maxWaitForLoad: 35 * 1000,
    // lighthouse:default is mobile by default
    // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
    skipAudits: ['uses-http2'],
  },
  audits: [
    'metrics/first-contentful-paint-3g',
  ],
  categories: {
    performance: /** @type {LH.Config.CategoryJson} */({
      auditRefs: [
        {id: 'first-contentful-paint-3g', weight: 0},
      ],
    }),
  },
 };
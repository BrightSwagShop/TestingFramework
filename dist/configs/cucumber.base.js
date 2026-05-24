"use strict";
const sharedPaths = {
    paths: ['features/**/*.feature'],
    require: [
        'features/support/**/*.js',
        'features/step-definitions/**/*.js'
    ],
    publishQuiet: true
};
const allureFormat = 'allure-cucumberjs/reporter';
/**
 * Build Cucumber profile config objects.
 * Pass per-profile overrides to merge on top of the shared base.
 *
 * @param {object} overrides - { default, allure, browserstack }
 */
function buildProfiles(overrides = {}) {
    return {
        default: Object.assign(Object.assign(Object.assign({}, sharedPaths), { format: ['progress', allureFormat] }), overrides.default),
        allure: Object.assign(Object.assign(Object.assign({}, sharedPaths), { format: ['progress', allureFormat] }), overrides.allure),
        browserstack: Object.assign(Object.assign(Object.assign({}, sharedPaths), { format: ['progress', allureFormat, 'json:test-results/cucumber.json'] }), overrides.browserstack)
    };
}
module.exports = { sharedPaths, allureFormat, buildProfiles };

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
 * @param {object} overrides - { default, allure, testrail }
 */
function buildProfiles(overrides = {}) {
  return {
    default: {
      ...sharedPaths,
      format: ['progress', allureFormat],
      ...overrides.default
    },
    allure: {
      ...sharedPaths,
      format: ['progress', allureFormat],
      ...overrides.allure
    },
    testrail: {
      ...sharedPaths,
      format: ['progress', allureFormat, 'json:test-results/cucumber.json'],
      ...overrides.testrail
    }
  };
}

module.exports = { sharedPaths, allureFormat, buildProfiles };

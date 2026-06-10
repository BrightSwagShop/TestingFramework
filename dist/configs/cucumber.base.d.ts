export namespace sharedPaths {
    let paths: string[];
    let require: string[];
    let publishQuiet: boolean;
}
export const allureFormat: "allure-cucumberjs/reporter";
/**
 * Build Cucumber profile config objects.
 * Pass per-profile overrides to merge on top of the shared base.
 *
 * @param {object} overrides - { default, allure, testrail }
 */
export function buildProfiles(overrides?: object): {
    default: any;
    allure: any;
    testrail: any;
};

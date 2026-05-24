export namespace environments {
    namespace dev {
        let apiBaseUrl: string;
        let frontendUrl: string;
        namespace timeouts {
            let test: number;
            let expect: number;
            let navigation: number;
        }
    }
    namespace ci {
        let apiBaseUrl_1: string;
        export { apiBaseUrl_1 as apiBaseUrl };
        let frontendUrl_1: string;
        export { frontendUrl_1 as frontendUrl };
        export namespace timeouts_1 {
            let test_1: number;
            export { test_1 as test };
            let expect_1: number;
            export { expect_1 as expect };
            let navigation_1: number;
            export { navigation_1 as navigation };
        }
        export { timeouts_1 as timeouts };
    }
}
export const config: any;

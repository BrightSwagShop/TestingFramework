export = BrowserStackReporter;
declare class BrowserStackReporter {
    constructor(options?: {});
    username: string | undefined;
    accessKey: string | undefined;
    projectName: string;
    buildName: string;
    apiUrl: string;
    auth: {
        username: string | undefined;
        password: string | undefined;
    };
    testResults: any[];
    startTime: number;
    onTestRunFinished(result: any): Promise<void>;
    onTestStepFinished(step: any): Promise<void>;
}

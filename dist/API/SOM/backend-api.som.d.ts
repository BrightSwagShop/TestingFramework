export class BackendApiSom {
    constructor(request: any);
    request: any;
    parseJsonSafely(response: any): Promise<any>;
    readResponse(response: any): Promise<{
        response: any;
        status: any;
        ok: any;
        body: any;
    }>;
    getCategories(): any;
    getProductTypes(): any;
    uploadImageWithoutFile(): any;
}

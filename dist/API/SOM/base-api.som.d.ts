export class BaseApiSom {
    constructor(request: any);
    request: any;
    parseJsonSafely(response: any): Promise<any>;
    readResponse(response: any): Promise<{
        response: any;
        status: any;
        ok: any;
        body: any;
    }>;
}

export class ProductsApiSom {
    constructor(request: any);
    request: any;
    parseJsonSafely(response: any): Promise<any>;
    readResponse(response: any): Promise<{
        response: any;
        status: any;
        ok: any;
        body: any;
    }>;
    getAllProducts(): any;
    getProductById(productId: any): any;
    createProduct(payload: any): any;
    deleteProduct(productId: any): any;
}

export class ShoppingCartApiSom {
    constructor(request: any);
    request: any;
    parseJsonSafely(response: any): Promise<any>;
    readResponse(response: any): Promise<{
        response: any;
        status: any;
        ok: any;
        body: any;
    }>;
    createShoppingCart(payload: any): any;
    getShoppingCartByUserId(userId: any): any;
    getShoppingCartBySessionId(sessionId: any): any;
    deleteShoppingCart(cartId: any): any;
    createProduct(payload: any): any;
    deleteProduct(productId: any): any;
}

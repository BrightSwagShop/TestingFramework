export class ShoppingCartApiSom extends BaseApiSom {
    createShoppingCart(payload: any): any;
    getShoppingCartByUserId(userId: any): any;
    getShoppingCartBySessionId(sessionId: any): any;
    deleteShoppingCart(cartId: any): any;
}
import { BaseApiSom } from "./base-api.som";

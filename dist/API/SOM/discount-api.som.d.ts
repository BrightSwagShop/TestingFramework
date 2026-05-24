export class DiscountApiSom extends BaseApiSom {
    createDiscount(payload: any): any;
    deleteDiscount(discountId: any): any;
    getDiscountById(discountId: any): any;
    applyDiscountToCart(cartId: any, code: any): any;
}
import { BaseApiSom } from "./base-api.som";

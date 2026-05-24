export class OrderApiSom extends BaseApiSom {
    createOrder(payload: any): any;
    getOrderById(orderId: any): any;
    deleteOrder(orderId: any): any;
}
import { BaseApiSom } from "./base-api.som";

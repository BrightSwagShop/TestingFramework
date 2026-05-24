export class PaymentsApiSom extends BaseApiSom {
    createCheckoutSession(orderId: any): any;
    postStripeWebhook(payload: any): any;
}
import { BaseApiSom } from "./base-api.som";

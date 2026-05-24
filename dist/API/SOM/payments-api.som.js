"use strict";
const { BaseApiSom } = require('./base-api.som');
class PaymentsApiSom extends BaseApiSom {
    createCheckoutSession(orderId) {
        return this.request.post(`/api/payments/${orderId}/checkout`);
    }
    postStripeWebhook(payload) {
        return this.request.post('/api/webhooks/stripe', { data: payload });
    }
}
module.exports = { PaymentsApiSom };

"use strict";
const { BaseApiSom } = require('./base-api.som');
class OrderApiSom extends BaseApiSom {
    createOrder(payload) {
        return this.request.post('/api/orders', { data: payload });
    }
    getOrderById(orderId) {
        return this.request.get(`/api/orders/${orderId}`);
    }
    deleteOrder(orderId) {
        return this.request.delete(`/api/orders/${orderId}`);
    }
}
module.exports = { OrderApiSom };

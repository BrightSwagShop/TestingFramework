"use strict";
const { BaseApiSom } = require('./base-api.som');
class ShoppingCartApiSom extends BaseApiSom {
    createShoppingCart(payload) {
        return this.request.post('/api/shoppingcarts', { data: payload });
    }
    getShoppingCartByUserId(userId) {
        return this.request.get(`/api/shoppingcarts/user/${userId}`);
    }
    getShoppingCartBySessionId(sessionId) {
        return this.request.get(`/api/shoppingcarts/session/${sessionId}`);
    }
    deleteShoppingCart(cartId) {
        return this.request.delete(`/api/shoppingcarts/${cartId}`);
    }
}
module.exports = { ShoppingCartApiSom };

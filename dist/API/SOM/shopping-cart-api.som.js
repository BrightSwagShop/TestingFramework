"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ShoppingCartApiSom {
    constructor(request) {
        this.request = request;
    }
    parseJsonSafely(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = response.headers()['content-type'] || '';
            if (!contentType.includes('application/json')) {
                return null;
            }
            try {
                return yield response.json();
            }
            catch (_a) {
                return null;
            }
        });
    }
    readResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield this.parseJsonSafely(response);
            return {
                response,
                status: response.status(),
                ok: response.ok(),
                body
            };
        });
    }
    createShoppingCart(payload) {
        return this.request.post('/api/shoppingcarts', {
            data: payload
        });
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
    createProduct(payload) {
        return this.request.post('/api/products', {
            data: payload
        });
    }
    deleteProduct(productId) {
        return this.request.delete(`/api/products/${productId}`);
    }
}
module.exports = {
    ShoppingCartApiSom
};

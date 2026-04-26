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
class ProductsApiSom {
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
    getAllProducts() {
        return this.request.get('/api/products');
    }
    getProductById(productId) {
        return this.request.get(`/api/products/${productId}`);
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
    ProductsApiSom
};

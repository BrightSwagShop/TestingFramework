const { BaseApiSom } = require('./base-api.som');

class ProductsApiSom extends BaseApiSom {
  getAllProducts() {
    return this.request.get('/api/products');
  }

  getProductById(productId) {
    return this.request.get(`/api/products/${productId}`);
  }

  createProduct(payload) {
    return this.request.post('/api/products', { data: payload });
  }

  deleteProduct(productId) {
    return this.request.delete(`/api/products/${productId}`);
  }
}

module.exports = { ProductsApiSom };

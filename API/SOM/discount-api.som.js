const { BaseApiSom } = require('./base-api.som');

class DiscountApiSom extends BaseApiSom {
  createDiscount(payload) {
    return this.request.post('/api/discounts', { data: payload });
  }

  deleteDiscount(discountId) {
    return this.request.delete(`/api/discounts/${discountId}`);
  }

  getDiscountById(discountId) {
    return this.request.get(`/api/discounts/${discountId}`);
  }

  applyDiscountToCart(cartId, code) {
    return this.request.post(`/api/shoppingcarts/${cartId}/apply-discount`, { data: { code } });
  }
}

module.exports = { DiscountApiSom };

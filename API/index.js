// SOMs
module.exports = {
  ...require('./SOM/base-api.som'),
  ...require('./SOM/backend-api.som'),
  ...require('./SOM/products-api.som'),
  ...require('./SOM/shopping-cart-api.som'),
  ...require('./SOM/users-api.som'),
  ...require('./SOM/discount-api.som'),
  ...require('./SOM/payments-api.som'),
  ...require('./SOM/order-api.som'),
  // Data factories
  ...require('./Data/product-payloads')
};

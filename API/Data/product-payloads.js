function createMugPayload() {
  const unique = Date.now();
  return {
    $type: 'SimpleProduct',
    name: `Playwright Mug ${unique}`,
    description: 'Simple API test product',
    price: 9.99,
    category: 'Drinkartikelen',
    productType: 'Mok',
    isActive: true,
    kleuren: [
      {
        kleur: 'Zwart',
        imageUrl: 'https://example.com/mug-black.png',
        stock: 10,
        sku: `MUG-${unique}`
      }
    ]
  };
}

function createTshirtPayload() {
  const unique = Date.now();
  return {
    $type: 'ProductWithSizes',
    name: `Playwright T-shirt ${unique}`,
    description: 'Simple API test t-shirt',
    price: 24.99,
    category: 'Kleding',
    productType: 'TShirt',
    isActive: true,
    kleuren: [
      {
        kleur: 'Wit',
        imageUrl: 'https://example.com/tshirt-white.png',
        maten: [
          { maat: 'M', stock: 5, sku: `TSH-M-${unique}` }
        ]
      }
    ]
  };
}

function createCartPayload(productId, options = {}) {
  const unique = Date.now();
  return {
    userId: options.userId || null,
    sessionId: options.sessionId || `sess-${unique}`,
    items: productId ? [{ productId, quantity: options.quantity || 1 }] : []
  };
}

function createUserPayload() {
  const unique = Date.now();
  return {
    username: `api-user-${unique}`,
    password: `P@ss-${unique}`
  };
}

function createDiscountPayload(code) {
  const unique = Date.now();
  const now = new Date();
  return {
    name: `Test Discount ${unique}`,
    description: 'API test discount',
    percentage: 10,
    code: code || `TESTCODE${unique}`,
    startsAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  };
}

function createOrderPayload(options = {}) {
  const unique = Date.now();
  return {
    userId: options.userId || `order-user-${unique}`,
    items: options.items || []
  };
}

module.exports = {
  createMugPayload,
  createTshirtPayload,
  createCartPayload,
  createUserPayload,
  createDiscountPayload,
  createOrderPayload
};

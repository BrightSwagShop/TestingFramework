export * from "./Frontend/Pages/Components/Navbar";
export * from "./Frontend/Pages/Components/Footer";
export * from "./Frontend/Pages/Components/Form";

export * from "./Frontend/Pages/BasePage";
export * from "./Frontend/Pages/HomePage";
export * from "./Frontend/Pages/AboutPage";
export * from "./Frontend/Pages/ContactPage";
export * from "./Frontend/Pages/LoginPage";
export * from "./Frontend/Pages/CartPage";
export * from "./Frontend/Pages/NotFoundPage";
export * from "./Frontend/Pages/AdminPage";

module.exports = {
  ...require('./API/SOM/backend-api.som'),
  ...require('./API/SOM/products-api.som'),
  ...require('./API/SOM/shopping-cart-api.som'),
  ...require('./API/Data/product-payloads')
};
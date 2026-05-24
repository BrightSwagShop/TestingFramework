export class ProductsApiSom extends BaseApiSom {
    getAllProducts(): any;
    getProductById(productId: any): any;
    createProduct(payload: any): any;
    deleteProduct(productId: any): any;
}
import { BaseApiSom } from "./base-api.som";

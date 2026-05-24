export function createMugPayload(): {
    $type: string;
    name: string;
    description: string;
    price: number;
    category: string;
    productType: string;
    isActive: boolean;
    kleuren: {
        kleur: string;
        imageUrl: string;
        stock: number;
        sku: string;
    }[];
};
export function createTshirtPayload(): {
    $type: string;
    name: string;
    description: string;
    price: number;
    category: string;
    productType: string;
    isActive: boolean;
    kleuren: {
        kleur: string;
        imageUrl: string;
        stock: number;
        sku: string;
    }[];
};
export function createCartPayload(productId: any, options?: {}): {
    userId: any;
    sessionId: any;
    items: {
        productId: any;
        quantity: any;
    }[];
};
export function createUserPayload(): {
    username: string;
    password: string;
};
export function createDiscountPayload(code: any): {
    name: string;
    description: string;
    percentage: number;
    code: any;
    startsAt: string;
    endsAt: string;
    isActive: boolean;
};
export function createOrderPayload(options?: {}): {
    userId: any;
    items: any;
};

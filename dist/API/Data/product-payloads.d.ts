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

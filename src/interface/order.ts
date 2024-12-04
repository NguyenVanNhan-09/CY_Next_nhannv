export interface TOrder {
    id?: number | string;
    address: string;
    phone: string;
    status?: string;
    sub_total?: number;
    tax?: number;
    total?: number;
    cart_item: TProductsOrder[];
}

export interface TProductsOrder {
    product_id?: number,
    quantity?: number;
    price?: number;
    name?: string;
    total?: number;
}
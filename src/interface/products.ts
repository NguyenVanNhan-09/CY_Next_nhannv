export interface TCategory {
    id?: number;
    name: string;
    slug: string;
    preview_img_path: string;
    created_at?: string;
    updated_at?: string;
}

export interface TProduct {
    id?: number;
    name: string;
    preview_img_path: string;
    description: string;
    price: number;
    stock: number;
    created_at?: string;
    updated_at?: string;
    category_id: number;
    category: TCategory;
    quantity?: number;
}

export interface CartItem extends TProduct {
    quantity: number;
}
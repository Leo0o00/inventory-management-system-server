

export interface UpdateProductDTO{
    branch: string;
    model: string;
    description: string;
    // img: string;
    purchase_price: number;
    stock_quantity: number;
    amount: number;
    purchase_date: Date;
    category_name: string;
    provider_name: string;
    pos_name: string;
}


export interface UpdateProductDTO{
    branch: string;
    model: string;
    description: string;
    category_id: string;
    purchase_price: number;
    purchase_date: Date;
    provider_id: string;
    stock_quantity: number;
    amount: number;
    points_of_sales_id: string;
}
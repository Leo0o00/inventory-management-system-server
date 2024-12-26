
// export interface CreateProductDTO {
//     branch: string;
//     model: string;
//     description: string;
//     purchase_price: number;
//     stock_quantity: number;
//     amount: number;
//     purchase_date: Date;
//     category_name: string;
//     provider_name: string;
//     pos_name: string;
//     files: File[];
// }

// export interface File {
    
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     buffer: Buffer;
//     size: number;
// }



export interface CreateProductDTO {
    branch: string;
    model: string;
    description: string;
    purchase_price: number;
    stock_quantity: number;
    amount: number;
    purchase_date: Date;
    category_name: string;
    provider_name: string;
    pos_name: string;
    img: string[];
}


import * as Joi from "joi";

export const isUuid = Joi.string().guid({ version: "uuidv4" });

export const isValidQuery = Joi.object({
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1).default(25),
    categories: Joi.string().default(''),
    providers: Joi.string().default(''),
    points_of_sales: Joi.string().default('')
});

export const isValidProduct = Joi.object({
    product_id: isUuid.required(),
    branch: Joi.string().min(2).max(45).required(),
    model: Joi.string().min(2).max(45).required(),
    description: Joi.string().min(3).max(255).required(),
    category_id: isUuid.required(),
    purchase_price: Joi.number().positive().required(),
    purchase_date: Joi.date().iso().required(),
    provider_id: isUuid.required(),
    stock_quantity: Joi.number().integer().positive().required(),
    amount: Joi.number().positive().required(),
    points_of_sales_id: isUuid.required()
});

export const isValidUpdateProduct = Joi.object({
    branch: Joi.string().min(2).max(45),
    model: Joi.string().min(2).max(45),
    description: Joi.string().min(3).max(255),
    category_id: isUuid,
    purchase_price: Joi.number().positive(),
    purchase_date: Joi.date().iso(),
    provider_id: isUuid,
    stock_quantity: Joi.number().integer().positive(),
    amount: Joi.number().positive(),
    points_of_sales_id: isUuid
});
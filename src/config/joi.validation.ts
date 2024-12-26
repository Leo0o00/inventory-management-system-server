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
    branch: Joi.string().min(2).max(45).required(),
    model: Joi.string().min(2).max(45).required(),
    description: Joi.string().min(3).max(255).required(),
    purchase_price: Joi.number().positive().required(),
    stock_quantity: Joi.number().integer().positive().required(),
    amount: Joi.number().positive().required(),
    purchase_date: Joi.date().iso().required(),
    category_name: Joi.string().required(),
    provider_name: Joi.string().required(),
    pos_name: Joi.string().required(),
    // img: Joi.array().items(
    //     Joi.string().required(),
    //     Joi.string(),
    //     Joi.string(),
    // ).max(3)
});

export const isValidImageFile = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required().valid('7bit'),
    mimetype: Joi.string().required().valid('image/jpeg', 'image/png'),
    buffer: Joi.binary().required(),
    size: Joi.number().required().positive().max(3000000)
})

export const isValidUpdateProduct = Joi.object({
    branch: Joi.string().min(2).max(45),
    model: Joi.string().min(2).max(45),
    description: Joi.string().min(3).max(255),
    // img: Joi.string(),
    purchase_price: Joi.number().positive(),
    stock_quantity: Joi.number().integer().positive(),
    amount: Joi.number().positive(),
    purchase_date: Joi.date().iso(),
    category_name: Joi.string(),
    provider_name: Joi.string(),
    pos_name: Joi.string()
});

export const isValidProductCategory = Joi.string().min(2).max(45).required();

export const isValidPointOfSalesCreateReqObj = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    address: Joi.string().min(2).max(100).required()
});
export const isValidPointOfSalesUpdateReqObj = Joi.object({
    name: Joi.string().min(2).max(45),
    address: Joi.string().min(2).max(100)
});

export const isValidProviderCreateReqObj = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    phone_number: Joi.string().min(2).max(45).required(),
    email: Joi.string().email()
});

export const isValidProviderUpdateReqObj = Joi.object({
    name: Joi.string().min(2).max(45),
    phone_number: Joi.string().min(2).max(45),
    email: Joi.string().email()
});

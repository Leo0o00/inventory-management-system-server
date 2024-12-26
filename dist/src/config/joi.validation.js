"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidProviderUpdateReqObj = exports.isValidProviderCreateReqObj = exports.isValidPointOfSalesUpdateReqObj = exports.isValidPointOfSalesCreateReqObj = exports.isValidProductCategory = exports.isValidUpdateProduct = exports.isValidImageFile = exports.isValidProduct = exports.isValidQuery = exports.isUuid = void 0;
const Joi = __importStar(require("joi"));
exports.isUuid = Joi.string().guid({ version: "uuidv4" });
exports.isValidQuery = Joi.object({
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1).default(25),
    categories: Joi.string().default(''),
    providers: Joi.string().default(''),
    points_of_sales: Joi.string().default('')
});
exports.isValidProduct = Joi.object({
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
exports.isValidImageFile = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required().valid('7bit'),
    mimetype: Joi.string().required().valid('image/jpeg', 'image/png'),
    buffer: Joi.binary().required(),
    size: Joi.number().required().positive().max(3000000)
});
exports.isValidUpdateProduct = Joi.object({
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
exports.isValidProductCategory = Joi.string().min(2).max(45).required();
exports.isValidPointOfSalesCreateReqObj = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    address: Joi.string().min(2).max(100).required()
});
exports.isValidPointOfSalesUpdateReqObj = Joi.object({
    name: Joi.string().min(2).max(45),
    address: Joi.string().min(2).max(100)
});
exports.isValidProviderCreateReqObj = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    phone_number: Joi.string().min(2).max(45).required(),
    email: Joi.string().email()
});
exports.isValidProviderUpdateReqObj = Joi.object({
    name: Joi.string().min(2).max(45),
    phone_number: Joi.string().min(2).max(45),
    email: Joi.string().email()
});

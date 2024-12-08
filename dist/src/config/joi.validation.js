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
exports.isValidProductCategory = exports.isValidUpdateProduct = exports.isValidProduct = exports.isValidQuery = exports.isUuid = void 0;
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
    category_id: exports.isUuid.required(),
    purchase_price: Joi.number().positive().required(),
    purchase_date: Joi.date().iso().required(),
    provider_id: exports.isUuid.required(),
    stock_quantity: Joi.number().integer().positive().required(),
    amount: Joi.number().positive().required(),
    points_of_sales_id: exports.isUuid.required()
});
exports.isValidUpdateProduct = Joi.object({
    branch: Joi.string().min(2).max(45),
    model: Joi.string().min(2).max(45),
    description: Joi.string().min(3).max(255),
    category_id: exports.isUuid,
    purchase_price: Joi.number().positive(),
    purchase_date: Joi.date().iso(),
    provider_id: exports.isUuid,
    stock_quantity: Joi.number().integer().positive(),
    amount: Joi.number().positive(),
    points_of_sales_id: exports.isUuid
});
exports.isValidProductCategory = Joi.string().min(2).max(45).required();

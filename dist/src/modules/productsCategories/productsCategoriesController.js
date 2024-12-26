"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductsCategories = listProductsCategories;
exports.postProductsCategories = postProductsCategories;
exports.updateProductsCategories = updateProductsCategories;
exports.removeProductsCategories = removeProductsCategories;
const joi_validation_1 = require("../../config/joi.validation");
const productsCategoriesService_1 = require("./productsCategoriesService");
function listProductsCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset || '0');
        const limit = Number(req.query.limit || '25');
        try {
            if (isNaN(offset) || isNaN(limit)) {
                res.status(400).json({ message: "Invalid offset or limit" });
                return;
            }
            const queryValidation = yield joi_validation_1.isValidQuery.validateAsync(req.query).catch(() => {
                res.status(400).json({ message: "Invalid query params" });
                return false;
            });
            if (!queryValidation) {
                return;
            }
            const categories = yield (0, productsCategoriesService_1.listCategories)({
                offset: offset,
                limit: limit
            });
            res.json(categories);
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    });
}
function postProductsCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                status: "error",
                message: "Bad Request"
            });
            return;
        }
        const categoryNameValidation = yield joi_validation_1.isValidProductCategory.validateAsync(name)
            .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!categoryNameValidation) {
            return;
        }
        try {
            const result = yield (0, productsCategoriesService_1.createCategory)(name);
            res.status(201).json({
                status: "success",
                message: "Product category created successfully",
                created: result
            });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    });
}
function updateProductsCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("req.body", req.body);
        // console.log("req.params", req.params);
        const { productCategory_id, name } = req.body;
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(productCategory_id).catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        const categoryNameValidation = yield joi_validation_1.isValidProductCategory.validateAsync(name)
            .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!uuidValidation || !categoryNameValidation) {
            return;
        }
        try {
            const result = yield (0, productsCategoriesService_1.updateCategory)(productCategory_id, name);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Product category not found"
                });
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "Product category updated successfully",
                    updated: result
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function removeProductsCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productCategory_id } = req.body;
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(productCategory_id).catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!uuidValidation) {
            return;
        }
        try {
            const result = yield (0, productsCategoriesService_1.deleteCategory)(productCategory_id);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Product category not found."
                });
            }
            res.status(200).json({
                status: "success",
                message: "Product category deleted successfully",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    });
}

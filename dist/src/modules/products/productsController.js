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
exports.listProducts = listProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const productsService_1 = require("./productsService");
const joi_validation_1 = require("../../config/joi.validation");
function listProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offset = Number(req.query.offset || '0');
            const limit = Number(req.query.limit || '25');
            if (isNaN(offset) || isNaN(limit)) {
                res.status(400).json({ message: "Invalid offset or limit" });
            }
            joi_validation_1.isValidQuery.validateAsync(req.query).catch(() => {
                res.status(400).json({ message: "Invalid query params" });
            });
            // isPositiveInt.validateAsync({ offset, limit }).catch(() => {
            //     res.status(400).json({ message: "Invalid offset or limit" });
            // });
            const products = yield (0, productsService_1.list)({
                offset: offset,
                limit: limit,
                categories: req.query.categories,
                providers: req.query.provider,
                points_of_sales: req.query.points_of_sales,
            });
            res.json(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function getProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            joi_validation_1.isUuid.validateAsync(id).catch(() => {
                res.status(400).json({ message: "Invalid product ID" });
            });
            const product = yield (0, productsService_1.getOne)(id);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    });
}
function createProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = req.body;
            if (!products) {
                res.status(400).json({
                    status: "error",
                    message: "Bad Request"
                });
                return;
            }
            if (!Array.isArray(products)) {
                res.status(400).json({
                    status: "error",
                    message: "Bad Request"
                });
                return;
            }
            if (products.length === 0) {
                res.status(400).json({
                    status: "error",
                    message: "Bad Request. You must submit at least one valid product."
                });
                return;
            }
            const validProducts = [];
            const invalidProducts = [];
            yield Promise.all(products.map((product) => joi_validation_1.isValidProduct.validateAsync(product)
                .then(() => {
                validProducts.push(product);
            })
                .catch(() => {
                invalidProducts.push({
                    error: "Invalid product",
                    product
                });
            })));
            if (validProducts.length === 0) {
                res.status(400).json({
                    status: 'error',
                    message: 'No valid products to process',
                    invalidProducts
                });
                return;
            }
            try {
                const entries = yield (0, productsService_1.create)(validProducts);
                res.status(201).json({
                    status: "success",
                    message: "Products created successfully",
                    data: {
                        created: entries,
                        validCount: validProducts.length,
                        invalidProducts: invalidProducts.length > 0 ? invalidProducts : [],
                        invalidCount: invalidProducts.length
                    }
                });
            }
            catch (error) {
                return next(error);
            }
        }
        catch (error) {
            next(new Error(`Unespected error processing the request.`));
        }
    });
}
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const properties = req.body;
        try {
            joi_validation_1.isUuid.validateAsync(id).catch(() => {
                res.status(400).json({ message: "Invalid product ID" });
            });
            joi_validation_1.isValidUpdateProduct.validateAsync(properties).catch(() => {
                res.status(400).json({ message: "Invalid product properties." });
            });
            const updatedProduct = yield (0, productsService_1.update)(id, properties);
            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
            }
            res.json({
                status: "success",
                message: "Product updated successfully",
                data: updatedProduct
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            joi_validation_1.isUuid.validateAsync(id).catch(() => {
                res.status(400).json({ message: "Invalid product ID" });
            });
            yield (0, productsService_1.remove)(id);
            res.status(200).send({
                status: "success",
                message: "Product deleted successfully"
            });
        }
        catch (error) {
            next(error);
        }
    });
}

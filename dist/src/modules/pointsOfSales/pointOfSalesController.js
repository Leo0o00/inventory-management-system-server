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
exports.listPointOfSales = listPointOfSales;
exports.createPointOfSales = createPointOfSales;
exports.updatePointOfSales = updatePointOfSales;
exports.deletePointOfSales = deletePointOfSales;
const joi_validation_1 = require("../../config/joi.validation");
const pointOfSalesService_1 = require("./pointOfSalesService");
function listPointOfSales(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset || '0');
        const limit = Number(req.query.limit || '25');
        try {
            if (isNaN(offset) || isNaN(limit)) {
                res.status(400).json({ message: "Invalid offset or limit" });
                return;
            }
            const queryValidation = yield joi_validation_1.isValidQuery.validateAsync(req.query).catch((_) => {
                res.status(400).json({ message: _.message });
                return false;
            });
            if (!queryValidation) {
                return;
            }
            const categories = yield (0, pointOfSalesService_1.listPos)({
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
function createPointOfSales(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address } = req.body;
        const properties = {
            name,
            address
        };
        const validation = yield joi_validation_1.isValidPointOfSalesCreateReqObj.validateAsync(properties).catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!validation) {
            return;
        }
        try {
            const result = yield (0, pointOfSalesService_1.createPos)(properties);
            res.status(201).json({
                status: "success",
                message: "Point of Sales created successfully",
                created: result
            });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    });
}
function updatePointOfSales(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { point_of_sales_id, name, address } = req.body;
        const properties = {
            name,
            address
        };
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(point_of_sales_id).catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        const posPropsValidation = yield joi_validation_1.isValidPointOfSalesUpdateReqObj.validateAsync(properties)
            .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!uuidValidation || !posPropsValidation) {
            return;
        }
        try {
            const result = yield (0, pointOfSalesService_1.updatePos)(point_of_sales_id, properties);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Point of Sales not found"
                });
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "Point of Sales updated successfully",
                    updated: result
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function deletePointOfSales(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { point_of_sales_id } = req.body;
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(point_of_sales_id).catch((_) => {
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
            const result = yield (0, pointOfSalesService_1.removePos)(point_of_sales_id);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Point of Sales not found."
                });
            }
            res.status(200).json({
                status: "success",
                message: "Point of Sales deleted successfully",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    });
}

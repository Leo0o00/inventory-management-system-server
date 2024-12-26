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
exports.listProvider = listProvider;
exports.postProvider = postProvider;
exports.updateProvider = updateProvider;
exports.deleteProvider = deleteProvider;
const joi_validation_1 = require("../../config/joi.validation");
const providerService_1 = require("./providerService");
function listProvider(req, res, next) {
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
            const categories = yield (0, providerService_1.listProviders)({
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
function postProvider(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, phone_number, email } = req.body;
        const properties = {
            name,
            phone_number,
            email
        };
        const validation = yield joi_validation_1.isValidProviderCreateReqObj.validateAsync(properties).catch((_) => {
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
            const result = yield (0, providerService_1.createProvider)(properties);
            res.status(201).json({
                status: "success",
                message: "Provider created successfully",
                created: result
            });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    });
}
function updateProvider(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { provider_id, name, phone_number, email } = req.body;
        const properties = {
            name,
            phone_number,
            email
        };
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(provider_id).catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        const providerPropsValidation = yield joi_validation_1.isValidProviderUpdateReqObj.validateAsync(properties)
            .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        });
        if (!uuidValidation || !providerPropsValidation) {
            return;
        }
        try {
            const result = yield (0, providerService_1.update_Provider)(provider_id, properties);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Provider not found"
                });
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "Provider updated successfully",
                    updated: result
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProvider(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { provider_id } = req.body;
        const uuidValidation = yield joi_validation_1.isUuid.validateAsync(provider_id).catch((_) => {
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
            const result = yield (0, providerService_1.removeProvider)(provider_id);
            if (!result) {
                res.status(404).json({
                    status: "error",
                    message: "Provider not found."
                });
            }
            res.status(200).json({
                status: "success",
                message: "Provider deleted successfully.",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    });
}

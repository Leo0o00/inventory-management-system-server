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
exports.listProviders = listProviders;
exports.createProvider = createProvider;
exports.update_Provider = update_Provider;
exports.removeProvider = removeProvider;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function listProviders() {
    return __awaiter(this, arguments, void 0, function* (opts = {}) {
        const { offset = 0, limit = 25 } = opts;
        try {
            const result = yield prisma.providers.findMany({
                select: {
                    provider_id: true,
                    name: true,
                    phone_number: true,
                    email: true,
                },
                skip: offset,
                take: limit
            });
            return result;
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            throw new Error("An error ocurring while listing points of sales");
        }
    });
}
function createProvider(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.providers.create({
                data: {
                    name: properties.name,
                    phone_number: properties.phone_number,
                    email: properties.email
                },
                select: {
                    provider_id: true,
                    name: true,
                    phone_number: true,
                    email: true
                }
            });
            return result;
        }
        catch (error) {
            console.error(error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        error.message = "A provider already exists under that name, phone number or email.";
                }
            }
            else {
                error.message = "An error occurred while creating the Provider.";
            }
            throw error;
        }
    });
}
function update_Provider(id, properties) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const provider = yield prisma.providers.findUnique({
                where: {
                    provider_id: id
                }
            });
            if (!provider) {
                return;
            }
            try {
                const result = yield prisma.providers.update({
                    where: {
                        provider_id: provider.provider_id
                    },
                    data: {
                        name: properties.name,
                        phone_number: properties.phone_number,
                        email: properties.email
                    },
                    select: {
                        provider_id: true,
                        name: true,
                        phone_number: true,
                        email: true
                    }
                });
                return result;
            }
            catch (error) {
                console.error(error);
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // Handle specific Prisma errors
                    switch (error.code) {
                        case 'P2002':
                            error.message = "A provider already exists under that name, phone number or email.";
                    }
                }
                else {
                    error.message = "An error occurred while updating the Provider.";
                }
                throw error;
            }
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            else {
                throw new Error(`Error updating Provider with id ${id}`);
            }
        }
    });
}
function removeProvider(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pos = yield prisma.providers.findUnique({
                where: {
                    provider_id: id
                },
                select: {
                    name: true,
                    phone_number: true,
                    email: true
                }
            });
            if (!pos) {
                return;
            }
            yield prisma.providers.delete({
                where: {
                    name: pos.name
                }
            });
            return pos;
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            else {
                throw new Error(`Error deleting Provider with id ${id}`);
            }
        }
    });
}

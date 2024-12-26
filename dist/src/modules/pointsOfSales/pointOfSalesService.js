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
exports.listPos = listPos;
exports.createPos = createPos;
exports.updatePos = updatePos;
exports.removePos = removePos;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function listPos() {
    return __awaiter(this, arguments, void 0, function* (opts = {}) {
        const { offset = 0, limit = 25 } = opts;
        try {
            const result = yield prisma.points_of_sales.findMany({
                select: {
                    point_of_sales_id: true,
                    name: true,
                    address: true,
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
function createPos(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.points_of_sales.create({
                data: {
                    name: properties.name,
                    address: properties.address
                },
                select: {
                    point_of_sales_id: true,
                    name: true,
                    address: true
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
                        error.message = "A Point of Sales already exists with that name.";
                }
            }
            else {
                error.message = "An error occurred while creating the Point of Sales.";
            }
            throw error;
        }
    });
}
function updatePos(id, properties) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pos = yield prisma.points_of_sales.findUnique({
                where: {
                    point_of_sales_id: id
                }
            });
            if (!pos) {
                return;
            }
            try {
                const result = yield prisma.points_of_sales.update({
                    where: {
                        point_of_sales_id: pos.point_of_sales_id
                    },
                    data: {
                        name: properties.name,
                        address: properties.address
                    },
                    select: {
                        point_of_sales_id: true,
                        name: true,
                        address: true
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
                            error.message = "A Point of Sales already exists with that name.";
                    }
                }
                else {
                    error.message = "An error occurred while updating the Point of Sales.";
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
                throw new Error(`Error updating Point of Sales with id ${id}`);
            }
        }
    });
}
function removePos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pos = yield prisma.points_of_sales.findUnique({
                where: {
                    point_of_sales_id: id
                },
                select: {
                    name: true,
                    address: true
                }
            });
            if (!pos) {
                return;
            }
            yield prisma.points_of_sales.delete({
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
                throw new Error(`Error deleting Point of Sales with id ${id}`);
            }
        }
    });
}

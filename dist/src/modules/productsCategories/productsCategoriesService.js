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
exports.listCategories = listCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function listCategories() {
    return __awaiter(this, arguments, void 0, function* (opts = {}) {
        const { offset = 0, limit = 25 } = opts;
        const categories = yield prisma.products_categories.findMany({
            select: {
                category_id: true,
                name: true
            },
            skip: offset,
            take: limit
        });
        return categories;
    });
}
function createCategory(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield prisma.products_categories.create({
                data: {
                    name
                },
                select: {
                    category_id: true,
                    name: true
                }
            });
            return category;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        error.message = "A product category already exists with that name.";
                }
            }
            else {
                error.message = "An error occurred while creating the product category.";
            }
            throw error;
        }
    });
}
function updateCategory(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield prisma.products_categories.findUnique({
                where: {
                    category_id: id
                }
            });
            if (!category) {
                return;
            }
            const existingCategory = yield prisma.products_categories.findUnique({
                where: {
                    name: name
                }
            });
            if (existingCategory) {
                throw new Error("A product category already exists with that name.");
            }
            else {
                const result = yield prisma.products_categories.update({
                    where: {
                        category_id: category.category_id
                    },
                    data: {
                        name
                    },
                    select: {
                        category_id: true,
                        name: true
                    }
                });
                return result;
            }
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            else {
                throw new Error(`Error updating category with id ${id}`);
            }
        }
    });
}
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield prisma.products_categories.findUnique({
                where: {
                    category_id: id
                }
            });
            if (!category) {
                throw new Error(`Category with id ${id} not found`);
            }
            yield prisma.products_categories.delete({
                where: {
                    category_id: category.category_id
                }
            });
            return category;
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            else {
                throw new Error(`Error deleting category with id ${id}`);
            }
        }
    });
}

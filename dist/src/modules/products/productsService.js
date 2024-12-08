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
exports.list = list;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.remove = remove;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function list() {
    return __awaiter(this, arguments, void 0, function* (opts = {}) {
        const { offset = 0, limit = 25, categories, providers, points_of_sales } = opts;
        const products = yield prisma.products.findMany({
            select: {
                product_id: true,
                branch: true,
                model: true,
                description: true,
                category: {
                    select: {
                        name: true
                    }
                },
                purchase_price: true,
                purchase_date: true,
                provider: {
                    select: {
                        name: true
                    }
                },
                stock_quantity: true,
                amount: true,
                points_of_sales: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: limit,
            where: {
                category: {
                    name: {
                        in: categories === null || categories === void 0 ? void 0 : categories.split(',')
                    }
                },
                provider: {
                    name: {
                        in: providers === null || providers === void 0 ? void 0 : providers.split(',')
                    }
                },
                points_of_sales: {
                    name: {
                        in: points_of_sales === null || points_of_sales === void 0 ? void 0 : points_of_sales.split(',')
                    }
                }
            }
        });
        return products;
    });
}
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield prisma.products.findUnique({
                where: {
                    product_id: id
                },
                select: {
                    product_id: true,
                    branch: true,
                    model: true,
                    description: true,
                    category: {
                        select: {
                            category_id: true,
                            name: true
                        }
                    },
                    purchase_price: true,
                    purchase_date: true,
                    provider: {
                        select: {
                            provider_id: true,
                            name: true
                        }
                    },
                    stock_quantity: true,
                    amount: true,
                    points_of_sales: {
                        select: {
                            pos_id: true,
                            name: true
                        }
                    }
                }
            });
            if (!product) {
                return;
            }
            return product;
        }
        catch (error) {
            // throw new Error(`Error getting product with id ${id}`);
        }
    });
}
function create(entries) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield prisma.$transaction(entries.map((entry) => prisma.products.create({
                data: {
                    branch: entry.branch,
                    model: entry.model,
                    description: entry.description,
                    category: {
                        connect: {
                            category_id: entry.category_id
                        }
                    },
                    purchase_price: entry.purchase_price,
                    purchase_date: entry.purchase_date,
                    provider: {
                        connect: {
                            provider_id: entry.provider_id
                        }
                    },
                    stock_quantity: entry.stock_quantity,
                    amount: entry.amount,
                    points_of_sales: {
                        connect: {
                            pos_id: entry.points_of_sales_id
                        }
                    }
                },
                select: {
                    product_id: true,
                }
            })));
            return products;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        throw new Error('A unique constraint would be violated.');
                    default:
                        throw new Error(`Error creating products: ${error.message}`);
                }
            }
            throw error;
        }
    });
}
function update(id, updateProductDTO) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield getOne(id);
        if (!product) {
            return;
        }
        try {
            yield prisma.products.update({
                where: {
                    product_id: product.product_id
                },
                data: Object.assign({}, updateProductDTO)
            });
            return Object.assign(Object.assign({}, product), updateProductDTO);
        }
        catch (error) {
            console.error(error);
            throw new Error(`Error updating product with id ${id}`);
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield getOne(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        try {
            yield prisma.products.delete({
                where: {
                    product_id: product.product_id
                },
                select: {
                    product_id: true
                }
            });
            return product;
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                throw error;
            }
            else {
                throw new Error(`Error deleting product with id ${id}`);
            }
        }
    });
}

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
// interface Ids {
//     product_id: UUID
// }
function list() {
    return __awaiter(this, arguments, void 0, function* (opts = {}) {
        const { offset = 0, limit = 25, categories, providers, points_of_sales } = opts;
        try {
            const products = yield prisma.products.findMany({
                select: {
                    product_id: true,
                    branch: true,
                    model: true,
                    description: true,
                    purchase_price: true,
                    stock_quantity: true,
                    amount: true,
                    purchase_date: true,
                    category_name: true,
                    provider_name: true,
                    pos_name: true
                },
                skip: offset,
                take: limit,
                where: {
                    category: {
                        name: {
                            in: categories === null || categories === void 0 ? void 0 : categories.split('+')
                        }
                    },
                    provider: {
                        name: {
                            in: providers === null || providers === void 0 ? void 0 : providers.split('+')
                        }
                    },
                    points_of_sales: {
                        name: {
                            in: points_of_sales === null || points_of_sales === void 0 ? void 0 : points_of_sales.split('+')
                        }
                    }
                }
            });
            return products;
        }
        catch (error) {
            if (error.message) {
                throw error;
            }
            throw new Error("Error getting products");
        }
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
                    purchase_price: true,
                    stock_quantity: true,
                    amount: true,
                    purchase_date: true,
                    category_name: true,
                    provider_name: true,
                    pos_name: true
                }
            });
            if (!product) {
                return;
            }
            return product;
        }
        catch (error) {
            if (error.message) {
                throw error;
            }
            throw new Error(`Error getting product with id ${id}`);
        }
    });
}
function create(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const images = product.img.map((img) => {
                return { image_name: img };
            });
            console.log("images value before database insertion: ", images);
            const products = yield prisma.products.create({
                data: {
                    branch: product.branch,
                    model: product.model,
                    description: product.description,
                    purchase_price: product.purchase_price,
                    stock_quantity: product.stock_quantity,
                    amount: product.amount,
                    purchase_date: product.purchase_date,
                    category: {
                        connect: {
                            name: product.category_name
                        }
                    },
                    provider: {
                        connect: {
                            name: product.provider_name
                        }
                    },
                    points_of_sales: {
                        connect: {
                            name: product.pos_name
                        }
                    },
                    img: {
                        createMany: {
                            data: images
                        }
                    },
                },
                select: {
                    product_id: true,
                    branch: true,
                    model: true,
                    description: true,
                    purchase_price: true,
                    stock_quantity: true,
                    amount: true,
                    purchase_date: true,
                    category_name: true,
                    provider_name: true,
                    pos_name: true,
                    img: {
                        select: {
                            image_name: true
                        }
                    }
                }
            });
            return products;
        }
        catch (error) {
            console.error(error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        throw new Error('A unique constraint would be violated.');
                    case 'P2025':
                        // throw new Error("No 'Points_of_sales' record(s) (needed to inline the relation on 'Products' record(s)) was found for a nested connect on one-to-many relation 'Points_of_salesToProducts'.")
                        throw new Error("No Point of Sale, Provider or Product Category was fount with that name.");
                    default:
                        throw new Error(`Error creating products: ${error.message}`);
                }
            }
            if (error.message) {
                throw error;
            }
            throw new Error();
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
            if (error.message) {
                throw error;
            }
            throw new Error(`Error updating product with id ${id}`);
        }
    });
}
function remove(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        // const product = await getOne(id);
        let results = {
            deleted: [],
            notFound: []
        };
        for (const id of ids) {
            const product = yield getOne(id);
            if (!product) {
                // results[id] = `Product with id ${id} not found`;
                results.notFound.push(id);
                // console.log(results);
                continue;
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
                // results[id] = product;
                results.deleted.push(product.product_id);
            }
            catch (error) {
                console.error(error);
                if (error.message) {
                    results[id] = error.message;
                }
                else {
                    results[id] = `Error deleting product with id ${id}`;
                }
            }
        }
        return results;
        // if (!product) {
        //     throw new Error(`Product with id ${id} not found`);
        // }
        // try {
        //     await prisma.products.deleteMany({
        //         where: {
        //             product_id: product.product_id
        //         },
        //         select: {
        //             product_id: true
        //         }
        //     });
        //     return product;
        // } catch (error: any) {
        //     console.error(error);
        //     if (error.message) {
        //         throw error;
        //     } else {
        //         throw new Error(`Error deleting product with id ${id}`);
        //     }
        // }
    });
}

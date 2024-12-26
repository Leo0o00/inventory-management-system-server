import { Prisma, PrismaClient, Products } from "@prisma/client";
import { UUID } from "crypto";
import { CreateProductDTO } from "./dto/createProductDTO";
import { UpdateProductDTO } from "./dto/updateProductDTO";

const prisma = new PrismaClient();

interface ListProductQuery{
    offset?: number;
    limit?: number;
    categories?: string;
    points_of_sales?: string;
    providers?: string;
}

// interface Ids {
//     product_id: UUID
// }

export async function list(opts: ListProductQuery = {}) {
    const { offset = 0, limit = 25, categories, providers, points_of_sales } = opts;

    try {
        
        const products = await prisma.products.findMany({
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
                        in: categories?.split('+')
                    }
                },
                provider: {
                    name: {
                        in: providers?.split('+')
                    }
                },
                points_of_sales: {
                    name: {
                        in: points_of_sales?.split('+')
                    }
                }
            }
        });
        return products;
    } catch (error: any) {
        if (error.message) {
            throw error;
        }
        throw new Error("Error getting products");
    }
    }

export async function getOne(id: UUID) {
    try {
        
        const product = await prisma.products.findUnique({
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
        
    } catch (error: any) {
        if (error.message) {
            throw error;
        }
        throw new Error(`Error getting product with id ${id}`);
    }
}

export async function create(product: CreateProductDTO) {
    try {
        const images = product.img.map((img) => {
            return { image_name: img };
        })

        console.log("images value before database insertion: ", images)

        const products = await prisma.products.create({
                
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
        })
                
        return products;

    } catch (error: any) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
    
}



export async function update(id: UUID, updateProductDTO: Partial<UpdateProductDTO>) {
    const product = await getOne(id);
    

    if (!product) {
        return;
    }

    try {

        await prisma.products.update({
            where: {
                product_id: product.product_id
            },
            data: {
                ...updateProductDTO
            }
            
            }
        )
        return { ...product, ...updateProductDTO };
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        }
        throw new Error(`Error updating product with id ${id}`);
    }
}

export async function remove(ids: UUID[]) {
    // const product = await getOne(id);
    let results: any = {
        deleted: [],
        notFound: []
    };

    for (const id of ids) {
        const product = await getOne(id);
        if (!product) {
            // results[id] = `Product with id ${id} not found`;
            results.notFound.push(id);
            // console.log(results);
            continue;
        }
        try {
            await prisma.products.delete({
                where: {
                    product_id: product.product_id
                },
                select: {
                    product_id: true
                }
            });
            // results[id] = product;
            results.deleted.push(product.product_id);
        } catch (error: any) {
            console.error(error);
            if (error.message) {
                results[id] = error.message;
            } else {
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
}
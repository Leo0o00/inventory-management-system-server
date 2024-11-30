import { Prisma, PrismaClient } from "@prisma/client";
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

export async function list(opts: ListProductQuery = {}) {
    const { offset = 0, limit = 25, categories, providers, points_of_sales } = opts;


    const products = await prisma.products.findMany({
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
                    in: categories?.split(',')
                }
            },
            provider: {
                name: {
                    in: providers?.split(',')
                }
            },
            points_of_sales: {
                name: {
                    in: points_of_sales?.split(',')
                }
            }
        }
    });
    return products;
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
        
    } catch (error) {
        // throw new Error(`Error getting product with id ${id}`);
    }
}

export async function create(entries: CreateProductDTO[]) {
    try {
        const products = await prisma.$transaction(
            entries.map((entry) => prisma.products.create({
                
                data: {
                    product_id: entry.product_id,
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
            }))
        );

        return products;

    } catch (error: any) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            switch (error.code) {
                case 'P2002':
                    throw new Error('A unique constraint would be violated.');
                case 'P2003':
                    throw new Error('Foreign key constraint failed - one or more referenced IDs do not exist.');
                case 'P2025':
                    throw new Error('Record not found - referenced category, provider, or point of sale does not exist.');
                default:
                    throw new Error(`Error creating products: ${error.message}`);
            }
        }
        throw error;
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
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating product with id ${id}`);
    }
}

export async function remove(id: UUID) {
    const product = await getOne(id);

    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }

    try {
        await prisma.products.delete({
            where: {
                product_id: product.product_id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Error deleting product with id ${id}`);
    }


}
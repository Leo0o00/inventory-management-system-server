import { Prisma, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import ErrorRequest from "../../common/interfaces/error";

const prisma = new PrismaClient();

interface query{
    limit?: number;
    offset?: number;
}



export async function listCategories(opts: query = {}) {
    const { offset = 0, limit = 25 } = opts;

    try {
        
        const categories = await prisma.products_categories.findMany({
            select: {
                products_categories_id: true,
                name: true
            },
            skip: offset,
            take: limit
        });
        
        return categories;
        
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        }
        throw new Error("An error ocurring while listing products categories")
    }
}

export async function createCategory(name: string) {
    try {
        const category = await prisma.products_categories.create({
            data: {
                name
            }, 
            select: {
                products_categories_id: true,
                name: true
            }
        })
        return category;
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            switch (error.code) {
                case 'P2002':
                    error.message = "A product category already exists with that name.";
                
            }
        } else {
            error.message = "An error occurred while creating the product category.";
        }
        throw error;
    }
}

export async function updateCategory(id: UUID, name: string) {
    try {
        const category = await prisma.products_categories.findUnique({
            where: {
                products_categories_id: id
            }
        });

        if (!category) {
            return;
        }

        try {
            
            const result = await prisma.products_categories.update({
                where: {
                    products_categories_id: category.products_categories_id
                },
                data: {
                    name
                },
                select: {
                    products_categories_id: true,
                    name: true
                }
            });
            
            return result;
        } catch (error: any) {
            console.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        error.message = "A product category already exists with that name.";
                }
            } else {
                error.message = "An error occurred while updating the product category.";
            }
            throw error;
        }
        
        
        
        
    }
    
    catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        } else {
            throw new Error(`Error updating category with id ${id}`);
        }
    }
    
}

export async function deleteCategory(id: UUID) {
    try {
        const category = await prisma.products_categories.findUnique({
            where: {
                products_categories_id: id
            },
            select: {
                name: true
            }
        });

        if (!category) {
            return;
        }

        await prisma.products_categories.delete({
            where: {
                name: category.name
            }
        });

        return category;
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        } else {
            throw new Error(`Error deleting category with id ${id}`);
        }
    }
}


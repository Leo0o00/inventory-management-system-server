import { Prisma, PrismaClient } from "@prisma/client";
import { CreateProductCategoryDTO } from "./dto/createProductCategoryDTO";
import { UUID } from "crypto";
import ErrorRequest from "../../common/interfaces/error";

const prisma = new PrismaClient();

interface query{
    limit?: number;
    offset?: number;
}

export async function listCategories(opts: query = {}) {
    const { offset = 0, limit = 25 } = opts;

    const categories = await prisma.products_categories.findMany({
        select: {
            category_id: true,
            name: true
        },
        skip: offset,
        take: limit
    });

    
    return categories;
}

export async function createCategory(name: string) {
    try {
        const category = await prisma.products_categories.create({
            data: {
                name
            }, 
            select: {
                category_id: true,
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
                category_id: id
            }
        });

        if (!category) {
            return;
        }

        const existingCategory = await prisma.products_categories.findUnique({
            where: {
                name: name
            }
        });
        if (existingCategory) {
            throw new Error("A product category already exists with that name.");
        } else {
            const result = await prisma.products_categories.update({
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
        

    } catch (error: any) {
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
                category_id: id
            }
        });

        if (!category) {
            throw new Error(`Category with id ${id} not found`);
        }

        await prisma.products_categories.delete({
            where: {
                category_id: category.category_id
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


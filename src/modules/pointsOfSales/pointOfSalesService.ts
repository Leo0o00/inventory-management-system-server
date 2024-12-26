import { Prisma, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

interface query{
    limit?: number;
    offset?: number;
}

interface PosProperties{
    name: string;
    address: string;
}

export async function listPos(opts: query = {}) {
    const { offset = 0, limit = 25 } = opts;

    try {
        
        const result = await prisma.points_of_sales.findMany({
            select: {
                point_of_sales_id: true,
                name: true,
                address: true,

            },
            skip: offset,
            take: limit
        });
        
        return result;
        
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        }
        throw new Error("An error ocurring while listing points of sales")
    }
}
export async function createPos(properties: PosProperties) {
    try {
        const result = await prisma.points_of_sales.create({
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
    } catch (error: any) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            switch (error.code) {
                case 'P2002':
                    error.message = "A Point of Sales already exists with that name.";
                
            }
        } else {
            error.message = "An error occurred while creating the Point of Sales.";
        }
        throw error;
    }
}
export async function updatePos(id: UUID, properties: Partial<PosProperties>) {
    try {
        const pos = await prisma.points_of_sales.findUnique({
            where: {
                point_of_sales_id: id
            }
        });

        if (!pos) {
            return;
        }

        try {
            
            const result = await prisma.points_of_sales.update({
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
        } catch (error: any) {
            console.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        error.message = "A Point of Sales already exists with that name.";
                }
            } else {
                error.message = "An error occurred while updating the Point of Sales.";
            }
            throw error;
        }
        
        
        
        
    }
    
    catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        } else {
            throw new Error(`Error updating Point of Sales with id ${id}`);
        }
    }
    
}
export async function removePos(id: UUID) {
    try {
        const pos = await prisma.points_of_sales.findUnique({
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

        await prisma.points_of_sales.delete({
            where: {
                name: pos.name
            }
        });

        return pos;
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        } else {
            throw new Error(`Error deleting Point of Sales with id ${id}`);
        }
    }
    
}
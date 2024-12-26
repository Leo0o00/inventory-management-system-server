import { Prisma, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

interface query{
    limit?: number;
    offset?: number;
}

interface ProviderProperties{
    name: string;
    phone_number: string;
    email?: string;
}

export async function listProviders(opts: query = {}) {
    const { offset = 0, limit = 25 } = opts;

    try {
        
        const result = await prisma.providers.findMany({
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
        
    } catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        }
        throw new Error("An error ocurring while listing points of sales")
    }
}
export async function createProvider(properties: ProviderProperties) {
    try {
        const result = await prisma.providers.create({
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
    } catch (error: any) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            switch (error.code) {
                case 'P2002':
                    error.message = "A provider already exists under that name, phone number or email.";
                
            }
        } else {
            error.message = "An error occurred while creating the Provider.";
        }
        throw error;
    }
}
export async function update_Provider(id: UUID, properties: Partial<ProviderProperties>) {
    try {
        const provider = await prisma.providers.findUnique({
            where: {
                provider_id: id
            }
        });

        if (!provider) {
            return;
        }

        try {
            
            const result = await prisma.providers.update({
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
        } catch (error: any) {
            console.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle specific Prisma errors
                switch (error.code) {
                    case 'P2002':
                        error.message = "A provider already exists under that name, phone number or email.";
                }
            } else {
                error.message = "An error occurred while updating the Provider.";
            }
            throw error;
        }
        
        
        
        
    }
    
    catch (error: any) {
        console.error(error);
        if (error.message) {
            throw error;
        } else {
            throw new Error(`Error updating Provider with id ${id}`);
        }
    }
    
}
export async function removeProvider(id: UUID) {
    try {
        const pos = await prisma.providers.findUnique({
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

        await prisma.providers.delete({
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
            throw new Error(`Error deleting Provider with id ${id}`);
        }
    }
    
}
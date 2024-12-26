import { NextFunction, Request, Response } from "express";
import { isUuid, isValidProviderCreateReqObj, isValidProviderUpdateReqObj, isValidQuery } from "../../config/joi.validation";
import { createProvider, listProviders, removeProvider, update_Provider } from "./providerService";

export async function listProvider(req: Request, res: Response, next: NextFunction) {
    const offset = Number(req.query.offset || '0');
    const limit = Number(req.query.limit || '25');


    try {
        if (isNaN(offset) || isNaN(limit)) {
            res.status(400).json({ message: "Invalid offset or limit" });
            return;
        }
        const queryValidation = await isValidQuery.validateAsync(req.query).catch((_) => {
            res.status(400).json({ message: _.message });
            return false;
        });
    
        if (!queryValidation) {
            return;
        }   
        
    const categories = await listProviders({
        offset: offset,
        limit: limit
    });

    res.json(categories);
} catch (error) {
    console.error(error);
    next(error);
}
}
export async function postProvider(req: Request, res: Response, next: NextFunction) {
    const { name, phone_number, email } = req.body;
    const properties = {
        name,
        phone_number,
        email
    };

    const validation = await isValidProviderCreateReqObj.validateAsync(properties).catch((_) => {
        res.status(400).json({
            status: "error",
            message: _.message
        });
        return false;
    });

    if (!validation) {
        return;
    }

    try {
        const result = await createProvider(properties);
        res.status(201).json({
            status: "success",
            message: "Provider created successfully",
            created: result
        });
    } catch (error) {
        console.error(error);
        next(error);
    }


}
export async function updateProvider(req: Request, res: Response, next: NextFunction) {
    const { provider_id, name, phone_number, email } = req.body;
    const properties = {
        name,
        phone_number,
        email
    };

    const uuidValidation = await isUuid.validateAsync(provider_id).catch((_) => {
        res.status(400).json({
            status: "error",
            message: _.message
        });
        return false;

    });

    const providerPropsValidation = await isValidProviderUpdateReqObj.validateAsync(properties)
        .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        })
    
    if (!uuidValidation || !providerPropsValidation) {
        return;
    }

    try {
        const result = await update_Provider(provider_id, properties);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Provider not found"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Provider updated successfully",
                updated: result
            });
        }
        
    } catch (error) {
        next(error);
    }
}
export async function deleteProvider(req: Request, res: Response, next: NextFunction) {
    const { provider_id } = req.body;
    const uuidValidation = await isUuid.validateAsync(provider_id).catch((_) => {
        res.status(400).json({
            status: "error",
            message: _.message
        });
        return false;
    });
    if (!uuidValidation) {
        return;
    }

    try {
        const result = await removeProvider(provider_id);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Provider not found."
            })
        }
        res.status(200).json({
            status: "success",
            message: "Provider deleted successfully.",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
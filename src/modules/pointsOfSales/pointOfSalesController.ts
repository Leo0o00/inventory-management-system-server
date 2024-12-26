import { NextFunction, Request, Response } from "express";
import { isUuid, isValidPointOfSalesCreateReqObj, isValidPointOfSalesUpdateReqObj, isValidQuery } from "../../config/joi.validation";
import { createPos, listPos, removePos, updatePos } from "./pointOfSalesService";

export async function listPointOfSales(req: Request, res: Response, next: NextFunction) {
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
        
    const categories = await listPos({
        offset: offset,
        limit: limit
    });

    res.json(categories);
} catch (error) {
    console.error(error);
    next(error);
}
}
export async function createPointOfSales(req: Request, res: Response, next: NextFunction) {
    const { name, address } = req.body;
    const properties = {
        name,
        address
    };

    const validation = await isValidPointOfSalesCreateReqObj.validateAsync(properties).catch((_) => {
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
        const result = await createPos(properties);
        res.status(201).json({
            status: "success",
            message: "Point of Sales created successfully",
            created: result
        });
    } catch (error) {
        console.error(error);
        next(error);
    }


}
export async function updatePointOfSales(req: Request, res: Response, next: NextFunction) {
    const { point_of_sales_id, name, address } = req.body;
    const properties = {
        name,
        address
    };

    const uuidValidation = await isUuid.validateAsync(point_of_sales_id).catch((_) => {
        res.status(400).json({
            status: "error",
            message: _.message
        });
        return false;

    });

    const posPropsValidation = await isValidPointOfSalesUpdateReqObj.validateAsync(properties)
        .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        })
    
    if (!uuidValidation || !posPropsValidation) {
        return;
    }

    try {
        const result = await updatePos(point_of_sales_id, properties);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Point of Sales not found"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Point of Sales updated successfully",
                updated: result
            });
        }
        
    } catch (error) {
        next(error);
    }
}
export async function deletePointOfSales(req: Request, res: Response, next: NextFunction) {
    const { point_of_sales_id } = req.body;
    const uuidValidation = await isUuid.validateAsync(point_of_sales_id).catch((_) => {
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
        const result = await removePos(point_of_sales_id);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Point of Sales not found."
            })
        }
        res.status(200).json({
            status: "success",
            message: "Point of Sales deleted successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
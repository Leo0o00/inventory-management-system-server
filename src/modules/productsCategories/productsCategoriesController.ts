import { Request, Response, NextFunction, query } from "express";
import { isUuid, isValidProductCategory, isValidQuery } from "../../config/joi.validation";
import { createCategory, deleteCategory, listCategories, updateCategory } from "./productsCategoriesService";


export async function listProductsCategories(req: Request, res: Response, next: NextFunction) {
    const offset = Number(req.query.offset || '0');
    const limit = Number(req.query.limit || '25');


    try {
        if (isNaN(offset) || isNaN(limit)) {
            res.status(400).json({ message: "Invalid offset or limit" });
            return;
        }
        const queryValidation = await isValidQuery.validateAsync(req.query).catch(() => {
            res.status(400).json({ message: "Invalid query params" });
            return false;
        });
    
        if (!queryValidation) {
            return;
        }   
        
    const categories = await listCategories({
        offset: offset,
        limit: limit
    });

    res.json(categories);
} catch (error) {
    console.error(error);
    next(error);
}

}
export async function postProductsCategories(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({
            status: "error",
            message: "Bad Request"
        });
        return;
    }

    const categoryNameValidation = await isValidProductCategory.validateAsync(name)
        .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
    })

    if (!categoryNameValidation) {
        return;
    }

    try {
        const result = await createCategory(name);
        res.status(201).json({
            status: "success",
            message: "Product category created successfully",
            created: result
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export async function updateProductsCategories(req: Request, res: Response, next: NextFunction) {
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);
    const { productCategory_id, name } = req.body;

    const uuidValidation = await isUuid.validateAsync(productCategory_id).catch((_) => {
        res.status(400).json({
            status: "error",
            message: _.message
        });
        return false;

    });

    const categoryNameValidation = await isValidProductCategory.validateAsync(name)
        .catch((_) => {
            res.status(400).json({
                status: "error",
                message: _.message
            });
            return false;
        })
    
    if (!uuidValidation || !categoryNameValidation) {
        return;
    }

    try {
        const result = await updateCategory(productCategory_id, name);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Product category not found"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Product category updated successfully",
                updated: result
            });
        }
        
    } catch (error) {
        next(error);
    }
}
export async function removeProductsCategories(req: Request, res: Response, next: NextFunction) {
    const { productCategory_id } = req.body;
    const uuidValidation = await isUuid.validateAsync(productCategory_id).catch((_) => {
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
        const result = await deleteCategory(productCategory_id);
        if (!result) {
            res.status(404).json({
                status: "error",
                message: "Product category not found."
            })
        }
        res.status(200).json({
            status: "success",
            message: "Product category deleted successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
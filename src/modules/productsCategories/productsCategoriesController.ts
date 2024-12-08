import { Request, Response, NextFunction } from "express";
import { isUuid, isValidProductCategory, isValidQuery } from "../../config/joi.validation";
import { createCategory, deleteCategory, listCategories, updateCategory } from "./productsCategoriesService";


export async function listProductsCategories(req: Request, res: Response, next: NextFunction) {
    const offset = Number(req.query.offset || '0');
    const limit = Number(req.query.limit || '25');


    try {
        if (isNaN(offset) || isNaN(limit)) {
        res.status(400).json({ message: "Invalid offset or limit" });
    }
    isValidQuery.validateAsync(req.query).catch(() => {
        res.status(400).json({ message: "Invalid query params" });
    });
    
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

    isValidProductCategory.validateAsync(name)
        .catch(() => {
            res.status(400).json({
                status: "error",
                message: "Bad Request"
        })
    })


    try {
        const entry = await createCategory(name);
        res.status(201).json({
            status: "success",
            message: "Product category created successfully",
            created: entry
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export async function updateProductsCategories(req: Request, res: Response, next: NextFunction) {
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    const { category_id, name } = req.body;

    isUuid.validateAsync(category_id).catch(() => {
        res.status(400).json({
            status: "error",
            message: "Bad Request"
        });
    });

    isValidProductCategory.validateAsync(name)
        .catch(() => {
            res.status(400).json({
                status: "error",
                message: "Bad Request"
        })
    })

    try {
        const result = await updateCategory(category_id, name);
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
    const { category_id } = req.body;
    isUuid.validateAsync(category_id).catch(() => {
        res.status(400).json({
            status: "error",
            message: "Bad Request"
        });
    });

    try {
        const result = await deleteCategory(category_id);
        res.status(200).json({
            status: "success",
            message: "Product category deleted successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
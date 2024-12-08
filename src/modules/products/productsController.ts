import { Request, Response, NextFunction } from "express";
import { UUID } from "crypto";
import { isUuid, isValidProduct, isValidQuery, isValidUpdateProduct } from "../../config/joi.validation";
import { create, getOne, list, remove, update } from "./productsService";
import { CreateProductDTO } from "./dto/createProductDTO";




export async function listProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const offset = Number(req.query.offset || '0');
        const limit = Number(req.query.limit || '25');

        if(isNaN(offset) || isNaN(limit)){
            res.status(400).json({ message: "Invalid offset or limit" });
        }
        isValidQuery.validateAsync(req.query).catch(() => {
            res.status(400).json({ message: "Invalid query params" });
        });
        

        const products = await list({
            offset: offset,
            limit: limit,
            categories: req.query.categories as string,
            providers: req.query.provider as string,
            points_of_sales: req.query.points_of_sales as string,
        })


        res.json(products);
    } catch (error) {
        next(error);
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {

        isUuid.validateAsync(id).catch(() => {
            res.status(400).json({ message: "Invalid product ID" });
        });
        
        const product = await getOne(id as UUID);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("req.body", req.body);
        console.log("req.file", req.file);
        const products = req.body;
        
        if (!products) {
            res.status(400).json({
                status: "error",
                message: "Bad Request"
            });
            return;
        }
        if (!Array.isArray(products)) {
            res.status(400).json({
                status: "error",
                message: "Bad Request"
            });
            return;
        }
        if (products.length === 0) {
            res.status(400).json({
                status: "error",
                message: "Bad Request. You must submit at least one valid product."
            });
            return;
        }
        
        const validProducts: CreateProductDTO[] = []
        const invalidProducts: { product: CreateProductDTO; error: string } [] = [];
        
        await Promise.all(
            
            products.map((product: CreateProductDTO) => isValidProduct.validateAsync(product)
            .then(() => {
                validProducts.push(product);
            })
            .catch(() => {
                invalidProducts.push({
                    error: "Invalid product",
                    product
                });
            })
        )
    )
    
    if (validProducts.length === 0) {
        res.status(400).json({
            status: 'error',
            message: 'No valid products to process',
            invalidProducts
        });
        return;
    }
    
        try {
            const entries = await create(validProducts);
            res.status(201).json({
                status: "success",
                message: "Products created successfully",
                data: {
                    created: entries,
                    validCount: validProducts.length,
                    invalidProducts: invalidProducts.length > 0 ? invalidProducts : [],
                    invalidCount: invalidProducts.length
                }
            })
        } catch (error: any) {
            next(error);
        }
    } catch (error: any) {
        next(new Error(`Unespected error processing the request.`));
    }
}

// export async function setProductImage (req: Request, res: Response, next: NextFunction) {
//     //La request debe verse asi
//     //curl -X POST -H "Content-Type: image/jpeg" --data-binary @thedude.jpg http://localhost:1337/products/cjvzbkbv00000n2glbfrfgelx/image
    


//     const productId = req.params.id;
//     const s3 = new AWS.S3();
//     s3.uploadP = promisify(s3.upload);

//     const ext = {
//         'image/png': 'png',
//         'image/jpeg': 'jpeg'
//     }[req.headers['content-type']];

//     if (!ext) throw new Error('Invalid Image Type');

//     const params = {
//         Bucket: 'Print-Shop',
//         Key: `product-images/${productId}.${ext}`,
//         Body: req, //req es un stream, similar a fs.createReadStream()
//         ACL: 'public-read'
//     }
//     try {
//         const object = await s3.uploadP(params); //mi propia version de la promesa

//         const change = { img: object.Location };
//         const product = await Products.edit(productId, change);

//         res.json(product);
//     } catch (err){
//         next(err);
//     }
// }

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const properties = req.body;
    
    try {
        
        isUuid.validateAsync(id).catch(() => {
            res.status(400).json({ message: "Invalid product ID" });
        });

        isValidUpdateProduct.validateAsync(properties).catch(() => {
            res.status(400).json({ message: "Invalid product properties." });
        })

        const updatedProduct = await update(id as UUID, properties);
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.json({
                status: "success",
                message: "Product updated successfully",
                data: updatedProduct
            });
        }

    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        
        isUuid.validateAsync(id).catch(() => {
            res.status(400).json({ message: "Invalid product ID" });
        });

        const result = await remove(id as UUID);
        res.status(200).send({
            status: "success",
            message: "Product deleted successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const sharp_1 = __importDefault(require("sharp"));
const joi_validation_1 = require("../../config/joi.validation");
const productsService_1 = require("./productsService");
const generateEncryptedFileName_1 = require("../../common/utils/generateEncryptedFileName");
const s3_1 = require("../../common/s3");
// interface MassUploadRequest extends Request {
//     body: {
//         [key: string]: any
//     }
// }
function listProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offset = Number(req.query.offset || '0');
            const limit = Number(req.query.limit || '25');
            if (isNaN(offset) || isNaN(limit)) {
                res.status(400).json({ message: "Invalid offset or limit" });
                return;
            }
            const queryValidation = yield joi_validation_1.isValidQuery.validateAsync(req.query).catch((_) => {
                res.status(400).json({ message: _.message });
                return false;
            });
            if (!queryValidation) {
                return;
            }
            const products = yield (0, productsService_1.list)({
                offset: offset,
                limit: limit,
                categories: req.query.categories,
                providers: req.query.provider,
                points_of_sales: req.query.points_of_sales,
            });
            res.json(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function getProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const uuidValidation = yield joi_validation_1.isUuid.validateAsync(id).catch((_) => {
                res.status(400).json({ message: _.message });
                return false;
            });
            if (!uuidValidation) {
                return;
            }
            const product = yield (0, productsService_1.getOne)(id);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    });
}
function createProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // En req.files tenemos todas las imágenes, con sus fieldnames
            // En req.body tenemos los campos de texto con la estructura "products[0][marca]" y así.
            // 1. Identificar cuántos productos se enviaron
            // Una forma es parsear los índices que aparecen en los fieldnames. 
            // Por ejemplo, field: "products[0][marca]" => index = 0
            // De forma sencilla, podemos iterar sobre keys de req.body y extraer el "index".
            // Sin embargo, si sabemos que la UI envía n filas, podemos reconstruir la data.
            // Primero, descubrimos la cantidad de productos (puede ser heurístico o basado en keys).
            // Ejemplo simple: buscamos la mayor "products[x]" que haya. 
            // O un approach: en la UI podríamos mandar también un "totalProducts".
            // Para no complicar, haremos un array "parsedProducts" que iremos llenando:
            const parsedProducts = [];
            // Revisamos req.body para encontrar todos los campos "products[i][...]"
            for (const key of Object.keys(req.body.products)) {
                // Key = "products[0][marca]", "products[1][descripcion]", ...
                const match = key.match(/^products\((\d+)\)\((.+)\)$/);
                if (match) {
                    const index = parseInt(match[1], 10);
                    const field = match[2];
                    // Aseguramos que parsedProducts[index] sea un objeto
                    if (!parsedProducts[index]) {
                        parsedProducts[index] = {};
                    }
                    parsedProducts[index][field] = req.body.products[key];
                }
            }
            console.log("parsedProducts: ", parsedProducts);
            // 2. Asociar las imágenes a cada producto según su fieldname: "products[i][images]"
            // req.files es un array de todos los archivos subidos
            // Cada objeto en req.files tiene un "fieldname"
            // Ej: file.fieldname = "products[0][images]"
            for (const file of req.files) {
                const match = file.fieldname.match(/^products\((\d+)\)\(images\)$/);
                if (match) {
                    const index = parseInt(match[1], 10);
                    if (!parsedProducts[index].files) {
                        parsedProducts[index].files = [];
                    }
                    parsedProducts[index].files.push(file);
                }
            }
            console.log("parsedProducts after processing 'req.file' object", parsedProducts);
            // 3. Ahora "parsedProducts" tiene la estructura que necesitamos:
            //    [
            //      { marca: "...", modelo: "...", descripcion: "...", files: [file1, file2, ...] },
            //      ...
            //    ]
            // Validaciones y creación en BD
            const validProducts = [];
            const invalidProducts = [];
            for (const productData of parsedProducts) {
                // const productValidation = await isValidProduct.validateAsync(productData)
                //     .catch((_) => {
                //         res.status(400).json({ message: _.message });
                //         return false;
                //     });
                // if (!productValidation) return;
                if (!productData.branch
                    || !productData.model
                    || !productData.description
                    || !productData.purchase_price
                    || !productData.stock_quantity
                    || !productData.amount
                    || !productData.purchase_date
                    || !productData.category_name
                    || !productData.provider_name
                    || !productData.pos_name) {
                    res.status(400).json({
                        status: "error",
                        message: "Faltan campos requeridos en al menos uno de los productos."
                    });
                    return;
                }
                if (!productData.files || productData.files.length === 0) {
                    res.status(400).json({
                        status: "error",
                        message: "Cada producto debe tener al menos una foto."
                    });
                    return;
                }
                // Parsear numéricos
                const purchase_priceNumber = parseFloat(productData.purchase_price);
                const stock_quantityNumber = parseInt(productData.stock_quantity, 10);
                const totalAmount = purchase_priceNumber * stock_quantityNumber;
                // Parsear la fecha de compra a ISO-8601
                const purchase_dateISO = new Date(productData.purchase_date).toISOString();
                // Se validan los campos del producto basado en el esquema definido en joi.validation
                const product = {
                    branch: productData.branch,
                    model: productData.model,
                    description: productData.description,
                    purchase_price: purchase_priceNumber,
                    stock_quantity: stock_quantityNumber,
                    amount: totalAmount,
                    purchase_date: purchase_dateISO,
                    category_name: productData.category_name,
                    provider_name: productData.provider_name,
                    pos_name: productData.pos_name,
                };
                console.log("product before validation: ", product);
                const productValidation = yield joi_validation_1.isValidProduct.validateAsync(product)
                    .catch((_) => {
                    invalidProducts.push({
                        product,
                        error: _.message
                    });
                    return false;
                });
                if (!productValidation)
                    continue;
                // Subir fotos a S3 y guardar nombres
                const encryptedFileNames = [];
                for (const file of productData.files) {
                    const fileValidation = yield joi_validation_1.isValidImageFile.validateAsync(file)
                        .catch((_) => {
                        // invalidProducts.push({
                        //     product,
                        //     error: _.message
                        // });
                        return false;
                    });
                    if (!fileValidation)
                        continue;
                    const encryptedFileName = (0, generateEncryptedFileName_1.generateFileName)();
                    const fileSharpened = yield (0, sharp_1.default)(file.buffer)
                        .resize({ height: 1920, width: 1080, fit: 'contain' })
                        .toBuffer();
                    try {
                        yield (0, s3_1.uploadFile)(fileSharpened, encryptedFileName, file.mimetype);
                        console.log("upload file value: ", s3_1.uploadFile);
                    }
                    catch (error) {
                        next(error);
                        continue;
                    }
                    encryptedFileNames.push(encryptedFileName);
                }
                // Crear el producto en la base de datos
                try {
                    const newProduct = yield (0, productsService_1.create)({
                        branch: productData.branch,
                        model: productData.model,
                        description: productData.description,
                        purchase_price: purchase_priceNumber,
                        stock_quantity: stock_quantityNumber,
                        amount: totalAmount,
                        purchase_date: purchase_dateISO,
                        category_name: productData.category_name,
                        provider_name: productData.provider_name,
                        pos_name: productData.pos_name,
                        img: encryptedFileNames
                    });
                    validProducts.push(newProduct);
                }
                catch (error) {
                    next(error);
                }
            }
            if (validProducts.length === 0) {
                res.status(400).json({
                    status: 'error',
                    message: 'No valid products to process',
                    invalidProducts
                });
                return;
            }
            res.status(201).json({
                status: "success",
                message: "Products created successfully",
                data: {
                    created: validProducts,
                    validCount: validProducts.length,
                    invalidProducts: invalidProducts.length > 0 ? invalidProducts : [],
                    invalidCount: invalidProducts.length
                }
            });
        }
        catch (error) {
            next(new Error(`Unespected error processing the request.`));
        }
    });
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
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const properties = req.body;
        try {
            const uuidValidation = yield joi_validation_1.isUuid.validateAsync(id).catch((_) => {
                res.status(400).json({ message: _.message });
                return false;
            });
            const productPropertiesValidation = yield joi_validation_1.isValidUpdateProduct.validateAsync(properties).catch((_) => {
                res.status(400).json({ message: _.message });
                return false;
                // const error = {
                //     statusCode: 400,
                //     message: _.message
                // }
                // next(error);
                // return;
            });
            // console.log("isUuid value: ", isUuid);
            // console.log("isValidUpdateProduct value: ", isValidProduct);
            if (!uuidValidation || !productPropertiesValidation) {
                return;
            }
            const updatedProduct = yield (0, productsService_1.update)(id, properties);
            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
            }
            else {
                res.json({
                    status: "success",
                    message: "Product updated successfully",
                    data: updatedProduct
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ids } = req.body;
        const LENGTH = ids.length;
        try {
            let validProductsId = [], invalidProductsId = [];
            yield Promise.all(ids.map((id) => joi_validation_1.isUuid.validateAsync(id)
                .then(() => {
                validProductsId.push(id);
            })
                .catch(() => {
                invalidProductsId.push(id);
            })));
            if (validProductsId.length === 0) {
                res.status(400).json({
                    status: 'error',
                    message: 'No valid product id submited.',
                    invalidProductsId
                });
                return;
            }
            try {
                const result = yield (0, productsService_1.remove)(validProductsId);
                console.log(result);
                res.status(201).json({
                    status: "success",
                    data: {
                        deleted: result.deleted.length > 0 ? result.deleted : [],
                        deletedCount: result.deleted.length + "/" + LENGTH,
                        notFounded: result.notFound.length > 0 ? result.notFound : [],
                        notFoundedCount: result.notFound.length + "/" + LENGTH,
                        invalidProductsIds: invalidProductsId.length > 0 ? invalidProductsId : [],
                        invalidProductsIdsCount: invalidProductsId.length + "/" + LENGTH
                    }
                });
            }
            catch (error) {
                console.error(error);
                if (error.message) {
                    next(error);
                }
            }
        }
        catch (error) {
            console.error(error);
            if (error.message) {
                next(error);
            }
            next(new Error(`Unespected error processing the request.`));
        }
    });
}

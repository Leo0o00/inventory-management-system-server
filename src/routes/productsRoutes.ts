import { Router } from "express";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../modules/products/productsController";

const router = Router();

router.get("/", listProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
import { Router } from "express";
import { upload } from "../common/middlewares";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../modules/products/productsController";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", upload.any(), createProduct);
router.patch("/:id", updateProduct);
router.delete("/", deleteProduct);

export default router;
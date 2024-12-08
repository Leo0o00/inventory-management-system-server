import { Router } from "express";
import { upload } from "../common/middlewares";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../modules/products/productsController";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
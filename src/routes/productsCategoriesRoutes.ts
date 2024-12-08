import { Router } from "express";
import { listProductsCategories, postProductsCategories, removeProductsCategories, updateProductsCategories } from "../modules/productsCategories/productsCategoriesController";

const router = Router();

router.get("/", listProductsCategories);
router.post("/",postProductsCategories);
router.patch("/",updateProductsCategories);
router.delete("/",removeProductsCategories);

export default router;
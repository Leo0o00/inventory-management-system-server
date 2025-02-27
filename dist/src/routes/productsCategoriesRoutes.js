"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsCategoriesController_1 = require("../modules/productsCategories/productsCategoriesController");
const router = (0, express_1.Router)();
router.get("/", productsCategoriesController_1.listProductsCategories);
router.post("/", productsCategoriesController_1.postProductsCategories);
router.patch("/", productsCategoriesController_1.updateProductsCategories);
router.delete("/", productsCategoriesController_1.removeProductsCategories);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../modules/products/productsController");
const router = (0, express_1.Router)();
router.get("/", productsController_1.listProducts);
router.get("/products/:id", productsController_1.getProduct);
router.post("/products", productsController_1.createProduct);
router.patch("/products/:id", productsController_1.updateProduct);
router.delete("/products/:id", productsController_1.deleteProduct);
exports.default = router;

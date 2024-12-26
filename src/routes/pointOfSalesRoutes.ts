import { Router } from "express";
import { createPointOfSales, deletePointOfSales, listPointOfSales, updatePointOfSales } from "../modules/pointsOfSales/pointOfSalesController";

const router = Router();

router.get("/", listPointOfSales);
router.post("/",createPointOfSales);
router.patch("/",updatePointOfSales);
router.delete("/",deletePointOfSales);

export default router;
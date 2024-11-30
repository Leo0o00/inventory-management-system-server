import { Router } from "express";
import { getMetrics } from "../modules/dashboard/dashboardController";

const router = Router();

router.get("", getMetrics);

export default router;
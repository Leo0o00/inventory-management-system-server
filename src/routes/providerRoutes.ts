import { Router } from "express";
import { deleteProvider, listProvider, postProvider, updateProvider } from "../modules/provider/providerController";


const router = Router();

router.get("/", listProvider);
router.post("/",postProvider);
router.patch("/",updateProvider);
router.delete("/",deleteProvider);

export default router;
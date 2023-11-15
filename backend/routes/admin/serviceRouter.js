import { Router } from "express";
import { getServices } from "../../controllers/admin/serviceController.js";
const router = Router();

router.get("/getServices", getServices);
export default router;

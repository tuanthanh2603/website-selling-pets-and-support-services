import { Router } from "express";
import { createOrderService, getListOrderService } from "../../controllers/client/orderServiceController.js";
const router = Router();

router.post("/createOrderService", createOrderService)
router.get("/getListOrderService/:userId", getListOrderService)

export default router;
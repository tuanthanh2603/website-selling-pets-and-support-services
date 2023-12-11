import { Router } from "express";
import { createOrderService } from "../../controllers/client/orderServiceController.js";
const router = Router();

router.post("/createOrderService", createOrderService)

export default router;
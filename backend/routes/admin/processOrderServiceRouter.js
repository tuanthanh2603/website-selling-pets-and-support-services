import { Router } from "express";
const router = Router();

import { getAllOrdersService } from "../../controllers/admin/processOrderServiceController.js";

router.get("/getAllOrdersService", getAllOrdersService);

export default router;

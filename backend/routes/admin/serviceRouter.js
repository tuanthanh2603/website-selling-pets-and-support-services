import { Router } from "express";
const router = Router();

import { getAllServices } from "../../controllers/admin/serviceController.js";

router.get('/getAllService', getAllServices);

export default router;

import { Router } from "express";
const router = Router();

import { getAllServices, addServiceToCategory, deleteService, updateService } from "../../controllers/admin/serviceController.js";

router.get('/getAllService', getAllServices);
router.post("/addService", addServiceToCategory)
router.put("/updateService/:id", updateService)
router.delete("/deleteService/:id", deleteService)

export default router;

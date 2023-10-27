import { Router } from "express";
import { getListClient, updateInfoClientController } from "../../controllers/admin/clientController.js";
const router = Router();

router.get("/", getListClient)
router.put("/updateInfoClient", updateInfoClientController)
export default router;
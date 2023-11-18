import { Router } from "express";
import { addCategoryAccessory } from "../../controllers/admin/accessoryController.js";
const router = Router();

router.post('/addCategoryAccessory', addCategoryAccessory)

export default router;
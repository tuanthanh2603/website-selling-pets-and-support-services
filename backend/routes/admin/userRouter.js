import { Router } from "express";
import { addUser } from "../../controllers/admin/userController.js";
const router = Router();


router.post("/addUser", addUser)
export default router;
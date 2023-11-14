import { Router } from "express";
import { addUser, getListUser } from "../../controllers/admin/userController.js";
const router = Router();


router.post("/addUser", addUser)
router.get("/getListUser", getListUser)

export default router;
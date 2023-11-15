import { Router } from "express";
import { addUser, deleteUser, getListUser, updateUser } from "../../controllers/admin/userController.js";
const router = Router();


router.post("/addUser", addUser)
router.get("/getListUser", getListUser)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)

export default router;
import { Router } from "express";
import { addUserAccountController, loginUserAccountController } from "../../controllers/auth/authController.js";

const router = Router();

router.post('/addUserAccount', addUserAccountController);
router.post('/loginUserAccount', loginUserAccountController);

export default router;
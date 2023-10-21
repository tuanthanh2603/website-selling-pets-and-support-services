import { Router } from "express";
import { addUserAccountController } from "../../controllers/client/authController.js";

const router = Router();

router.post('/addUserAccount', addUserAccountController);

export default router;
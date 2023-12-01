import{Router} from "express";
import { cartController } from "../../controllers/client/cartController.js";
const router= Router();

router.post("/showCart/:searchValue",cartController)

export default router;
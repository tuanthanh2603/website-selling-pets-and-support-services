import{Router} from "express";
import { cartController } from "../../controllers/client/cartController.js";
const router= Router();

router.get("/showCart/:searchValue",cartController)

export default router;
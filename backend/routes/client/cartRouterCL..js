import{Router} from "express";
import { addToCart } from "../../controllers/client/cartController.js";
const router= Router();

router.put("/addToCart",addToCart)

export default router;
import{Router} from "express";
import { showCatData } from "../../controllers/client/catController.js";
const router= Router();

router.get("/showCatData",showCatData)

export default router;
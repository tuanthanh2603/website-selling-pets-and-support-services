import{Router} from "express";
import { showPet } from "../../controllers/client/petControllerCL.js";
const router= Router();

router.get("/showCategoryPet",showPet)

export default router;
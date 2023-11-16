import{Router} from "express";
import { showPetData } from "../../controllers/client/petControllerCL.js";
const router= Router();

router.get("/showCategoryPet",showPetData)

export default router;
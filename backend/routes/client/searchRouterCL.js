import{Router} from "express";
import { searchPetData } from "../../controllers/client/searchController.js";
const router= Router();

router.post("/searchPetName/:searchValue",searchPetData)

export default router;
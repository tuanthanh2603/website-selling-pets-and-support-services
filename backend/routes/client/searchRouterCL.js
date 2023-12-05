import{Router} from "express";
import { searchPetData,showInfo} from "../../controllers/client/searchController.js";
const router= Router();

router.post("/searchPetName/:searchValue",searchPetData)


router.get("/thong-tin-thu-cung/:petId",showInfo)
export default router;
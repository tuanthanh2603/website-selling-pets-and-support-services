/// client/petRouter.js
import { Router } from "express";
import { getCategoryPetToSelectDogPage, getPetToDogPage } from "../../controllers/client/petController.js";

const router = Router();

router.get("/getPetToDogPage", getPetToDogPage);

router.get("/getCategoryPetToSelectDogPage", getCategoryPetToSelectDogPage)
export default router;
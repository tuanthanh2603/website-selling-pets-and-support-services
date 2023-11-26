/// client/petRouter.js
import { Router } from "express";
import { getCategoryPetToSelectDogPage, getPetToDogPage } from "../../controllers/client/petController.js";
import { addToFavorites, getPetToFavourite } from "../../controllers/client/utilitiesController.js";
const router = Router();

router.get("/getPetToDogPage", getPetToDogPage);
router.post("/addToFavorites", addToFavorites);
router.get("/getPetToFavourite/:userId", getPetToFavourite);
router.get("/getCategoryPetToSelectDogPage", getCategoryPetToSelectDogPage)
export default router;
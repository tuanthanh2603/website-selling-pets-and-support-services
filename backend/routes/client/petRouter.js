/// client/petRouter.js
import { Router } from "express";
import { getPetToDogPage } from "../../controllers/client/petController.js";
import { addToFavorites, getPetToFavourite } from "../../controllers/client/utilitiesController.js";
const router = Router();

router.get("/getPetToDogPage", getPetToDogPage);
router.post("/addToFavorites", addToFavorites);
router.get("/getPetToFavourite/:userId", getPetToFavourite);
export default router;
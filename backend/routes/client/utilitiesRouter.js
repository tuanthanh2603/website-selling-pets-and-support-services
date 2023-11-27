import { Router } from "express";
import { addToFavorites, deleteFavourite, getInfoClient, getPetToFavourite, updateInfoClient } from "../../controllers/client/utilitiesController.js";
const router = Router();

router.post("/addToFavorites", addToFavorites);
router.get("/getPetToFavourite/:userId", getPetToFavourite);
router.delete("/deleteFavourite/:id", deleteFavourite);
router.get("/getInfoClient/:userId", getInfoClient)
router.put("/updateInfoClient/:userId", updateInfoClient);

export default router;
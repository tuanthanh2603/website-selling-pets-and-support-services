import { Router } from "express";
import { createPetController, deletePet } from "../../controllers/admin/petController.js";
import upload from "../../controllers/admin/uploadController.js";
import { getCategoryDogToSelect, getDog } from "../../controllers/admin/dogController.js";
import { getCat, getCategoryCatToSelect } from "../../controllers/admin/catController.js";

const router = Router();

router.get("/getCategorytDog", getCategoryDogToSelect)
router.get("/getCategoryCat", getCategoryCatToSelect)
router.post("/createPet", upload.any(), createPetController);
router.get("/getDog", getDog);
router.get("/getCat", getCat);
router.delete("/deletePet/:id", deletePet)

export default router;
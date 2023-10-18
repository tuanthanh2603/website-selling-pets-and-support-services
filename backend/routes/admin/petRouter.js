import { Router } from "express";
import { createPetController, getCategoryCat, getCategoryDog } from "../../controllers/admin/petController.js";
import upload from "../../controllers/admin/uploadController.js";
import { getDog } from "../../controllers/admin/dogController.js";
import { getCat } from "../../controllers/admin/catController.js";

const router = Router();

router.get("/getCategoryDog", getCategoryDog)
router.get("/getCategoryCat", getCategoryCat)
router.post("/createPet", upload.any(), createPetController);
router.get("/getDog", getDog);
router.get("/getCat", getCat);

export default router;
import { Router } from "express";
import { createPetController, getCategoryCat, getCategoryDog } from "../../controllers/admin/petController.js";
import upload from "../../controllers/admin/uploadController.js";

const router = Router();

router.get("/getDog", getCategoryDog)
router.get("/getCat", getCategoryCat)
router.post("/createPet", upload.any(), createPetController);

export default router;
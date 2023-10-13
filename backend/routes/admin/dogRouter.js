import { Router } from "express";
import {
  createCategoryDogController,
  getCategoryDog,
} from "../../controllers/admin/dogController.js";
import upload from "../../controllers/admin/uploadController.js";


const router = Router();


router.post("/addCategoryDog", upload.any() ,createCategoryDogController);
router.get("/", getCategoryDog);

export default router;

import { Router } from "express";
import {
  createCategoryDogController,
  deleteCategoryDog,
  getCategoryDog,
} from "../../controllers/admin/dogController.js";
import upload from "../../controllers/admin/uploadController.js";


const router = Router();


router.post("/addCategoryDog", upload.any() ,createCategoryDogController);
router.get("/", getCategoryDog);
router.delete("/deleteCategoryDog/:id", deleteCategoryDog);

export default router;

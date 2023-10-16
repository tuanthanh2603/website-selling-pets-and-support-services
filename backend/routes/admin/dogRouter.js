import { Router } from "express";
import {
  createCategoryDogController,
  deleteCategoryDog,
  getCategoryDog,
  updateCategoryDogController,
} from "../../controllers/admin/dogController.js";
import upload from "../../controllers/admin/uploadController.js";


const router = Router();


router.post("/addCategoryDog", upload.any() ,createCategoryDogController);
router.get("/", getCategoryDog);
router.delete("/deleteCategoryDog/:id", deleteCategoryDog);
router.post('/updateCategoryDog', upload.any() ,updateCategoryDogController);

export default router;

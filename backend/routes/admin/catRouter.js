import { Router } from "express";
import {
  createCategoryCatController,
  deleteCategoryCat,
  getCategoryCat,
} from "../../controllers/admin/catController.js";
import upload from "../../controllers/admin/uploadController.js";


const router = Router();


router.post("/addCategoryCat", upload.any() ,createCategoryCatController);
router.get("/", getCategoryCat);
router.delete("/deleteCategoryCat/:id", deleteCategoryCat);

export default router;

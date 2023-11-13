import { Router } from "express";
import { addCategoryPet, 
    deleteCategoryPet, 
    getCategoryPet, 
    updateCategoryPet, 
    getCategoryCatToSelect, 
    getCategoryDogToSelect, 
    addPet,
    getAllCat,
    getAllDog
} from "../../controllers/admin/petController.js";
import upload from "../../controllers/admin/uploadController.js";

// import { getCategoryDogToSelect, getDog } from "../../controllers/admin/dogController.js";
// import { getCat, getCategoryCatToSelect } from "../../controllers/admin/catController.js";

const router = Router();


// router.post("/createPet", upload.any(), createPetController);
// router.get("/getDog", getDog);
// router.get("/getCat", getCat);
// router.delete("/deletePet/:id", deletePet);
/// ----- is in the process of editing
router.post("/addCategoryPet", upload.any(), addCategoryPet);
router.get("/getCategoryPet", getCategoryPet);
router.delete("/deleteCategoryPet/:id", deleteCategoryPet);
router.put("/updateCategoryPet", upload.any(), updateCategoryPet);
router.get("/getCategoryDogToSelect", getCategoryDogToSelect);
router.get("/getCategoryCatToSelect", getCategoryCatToSelect);
router.post("/addPet", upload.any(), addPet);
router.get("/getAllDog", getAllDog);
router.get("/getAllCat", getAllCat);

export default router;

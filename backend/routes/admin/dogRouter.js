import { Router } from "express";
import { createCategoryDogController, getAdmin, getAdmin2 } from "../../controllers/admin/dogController.js";



const router = Router()


router.get('/2', getAdmin2);
router.get('/', getAdmin);
router.post('/addCategoryDog', createCategoryDogController);

  

export default router;
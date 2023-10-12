import { Router } from "express";
import { createCategoryDogController, getCategoryDog } from "../../controllers/admin/dogController.js";



const router = Router()



router.post('/addCategoryDog', createCategoryDogController);
router.get('/', getCategoryDog);

  

export default router;
/// client/petRouter.js
import { Router } from "express";
import { getPetToDogPage } from "../../controllers/client/petController.js";
const router = Router();

router.get("/getPetToDogPage", getPetToDogPage);
export default router;
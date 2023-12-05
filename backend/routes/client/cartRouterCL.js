import{Router} from "express";
import { cartController,khachHangController } from "../../controllers/client/cartController.js";
const router= Router();

router.get("/showCart/:searchValue",cartController)

router.get("/showKhachHang/:idkhachHang",khachHangController)

export default router;
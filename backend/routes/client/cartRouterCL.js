import{Router} from "express";
import { cartController,khachHangController,thanhtoan } from "../../controllers/client/cartController.js";
const router= Router();

router.get("/showCart/:searchValue",cartController)

router.get("/showKhachHang/:idkhachHang",khachHangController)

router.post("/thanh-toan", thanhtoan);



export default router;
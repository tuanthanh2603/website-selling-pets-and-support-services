import petRouter from "./admin/petRouter.js";
import authRouter from "./auth/authRouter.js";
import clientRouter from "./admin/clientRouter.js";
import petRouterCL from "./client/petRouterCL.js";
import searchRouterCL from "./client/searchRouterCL.js"
import catRouterCL from "./client/catRouterCL.js"
import userRouter from "./admin/userRouter.js";
import serviceRouter from "./admin/serviceRouter.js";
import accessoryRouter from "./admin/accessoryRouter.js";
import petRouterClient from "./client/petRouter.js"
import utilitiesRouter from "./client/utilitiesRouter.js"


const routes = (app) => {
  // app.use('/admin/danh-muc-cho-canh', dogRouter)
  // app.use('/admin/danh-muc-meo-canh', catRouter)
  // app.use('/admin/them-thu-cung-moi', petRouter)
  // app.use('/admin/danh-sach-thu-cung', petRouter)

  // ---
  app.use("/auth", authRouter);

  // --- Router hoàn thiện !
  app.use("/admin/quan-ly-khach-hang", clientRouter);
  app.use("/admin/quan-ly-san-pham", petRouter);
  app.use("/admin/quan-ly-san-pham", accessoryRouter);
  app.use("/admin/quan-ly-nhan-vien", userRouter);
  
  app.use("/client/dog-page", petRouterClient);
  app.use("/client/utilities", utilitiesRouter);
  // app.use('/admin/quan-ly-don-hang', )
  // app.use('/admin/quan-ly-dich-vu', )
  // ---
  app.use("/client/xem-trang-chu", petRouterCL);
  app.use("/client/tim-kiem-san-pham", searchRouterCL);
  app.use("/client/xem-trang-meo-canh", catRouterCL);
 

  app.use("/admin/quan-ly-dich-vu", serviceRouter);
};

export default routes;

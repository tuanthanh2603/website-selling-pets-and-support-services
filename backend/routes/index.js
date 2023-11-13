import petRouter from "./admin/petRouter.js";
import authRouter from "./auth/authRouter.js";
import clientRouter from "./admin/clientRouter.js";
import petRouterCL from "./client/petRouterCL.js"
import userRouter from "./admin/userRouter.js"

const routes = (app) => {
    // app.use('/admin/danh-muc-cho-canh', dogRouter)
    // app.use('/admin/danh-muc-meo-canh', catRouter)
    // app.use('/admin/them-thu-cung-moi', petRouter)
    // app.use('/admin/danh-sach-thu-cung', petRouter)

    // ---
    app.use('/auth', authRouter)

    // --- Router hoàn thiện !
    app.use('/admin/quan-ly-khach-hang', clientRouter)
    app.use('/admin/quan-ly-thu-cung', petRouter)
    app.use('/admin/quan-ly-nhan-vien', userRouter)
    // app.use('/admin/quan-ly-don-hang', )
    // app.use('/admin/quan-ly-dich-vu', )
    // ---
    app.use('/client/xem-trang-chu', petRouterCL)
}

export default routes;
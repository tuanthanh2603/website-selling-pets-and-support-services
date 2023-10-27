import dogRouter from "./admin/dogRouter.js";
import catRouter from "./admin/catRouter.js";
import petRouter from "./admin/petRouter.js";
import authRouter from "./auth/authRouter.js";
import clientRouter from "./admin/clientRouter.js";

const routes = (app) => {
    app.use('/admin/danh-muc-cho-canh', dogRouter)
    app.use('/admin/danh-muc-meo-canh', catRouter)
    app.use('/admin/them-thu-cung-moi', petRouter)
    app.use('/admin/danh-sach-thu-cung', petRouter)

    // ---
    app.use('/auth', authRouter)

    // --- Router hoàn thiện !
    app.use('/admin/quan-ly-khach-hang', clientRouter)
    // app.use('/admin/quan-ly-don-hang', )
    // app.use('/admin/quan-ly-dich-vu', )
    // ---
}

export default routes;
import dogRouter from "./admin/dogRouter.js";
import catRouter from "./admin/catRouter.js";
import petRouter from "./admin/petRouter.js";
import authRouter from "./auth/authRouter.js"

const routes = (app) => {
    app.use('/admin/danh-muc-cho-canh', dogRouter)
    app.use('/admin/danh-muc-meo-canh', catRouter)
    app.use('/admin/them-thu-cung-moi', petRouter)
    app.use('/admin/danh-sach-thu-cung', petRouter)
    app.use('/auth', authRouter);
}

export default routes;
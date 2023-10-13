import dogRouter from "./admin/dogRouter.js";
import catRouter from "./admin/catRouter.js";

const routes = (app) => {
    app.use('/admin/danh-muc-cho-canh', dogRouter)
    app.use('/admin/danh-muc-meo-canh', catRouter)
}

export default routes;
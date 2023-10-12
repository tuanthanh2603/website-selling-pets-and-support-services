import dogRouter from "./admin/dogRouter.js";

const routes = (app) => {
    app.use('/admin/danh-muc-cho-canh', dogRouter)
}

export default routes;
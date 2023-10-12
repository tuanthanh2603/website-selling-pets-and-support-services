import dogRouter from "./admin/dogRouter.js";

const routes = (app) => {
    app.use('/admin', dogRouter)
}

export default routes;
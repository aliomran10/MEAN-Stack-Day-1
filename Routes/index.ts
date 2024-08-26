import { Application } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoriesRoute from "./subCategoriesRoute";

const mountRoutes = (app:Application):void => {
    app.use('/api/v1/categories', categoriesRoute)
    app.use('/api/v1/subcategories', subCategoriesRoute)
}

export default mountRoutes;
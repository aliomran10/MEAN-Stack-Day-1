import * as all from '../Interfaces';
import { Application, Request, Response, NextFunction } from "express";
import categoriesRoute from "./categoriesRoute";
import subCategoriesRoute from './subCategoriesRoute';
import productsRoute from './productsRoute';
import globalErrors from '../middleware/globalErrors';
import ApiErrors from '../utils/apiError';


const mountRoutes = (app: Application): void => {
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategories', subCategoriesRoute);
    app.use('/api/v1/products', productsRoute);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiErrors(`The route ${req.originalUrl} is not found`, 400))
    })
    app.use(globalErrors);
}

export default mountRoutes;
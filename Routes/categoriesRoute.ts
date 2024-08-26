import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categories";

const categoriesRoute:Router = Router();

categoriesRoute.route('/')
.post(createCategory)
.get(getCategories);

categoriesRoute.route('/:id')
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)

export default categoriesRoute;
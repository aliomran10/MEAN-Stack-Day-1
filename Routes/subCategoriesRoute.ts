import { Router } from "express";
import { createSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "../controllers/subCategories";

const subCategoriesRoute:Router = Router();

subCategoriesRoute.route('/')
.post(createSubCategory)
.get(getSubCategories);

subCategoriesRoute.route('/:id')
.get(getSubCategory)
.put(updateSubCategory)
.delete(deleteSubCategory)

export default subCategoriesRoute;
import { Router } from "express";
import { createSubcategory, deleteSubcategory, filterData, getSubcategories, updateSubcategory } from "../controllers/subCategories";
import { createSubcategoryValidator, deleteSubcategoryValidator, updateSubcategoryValidator, getSubcategoryValidator } from "../utils/validator/subCategoriesValidator";

const subCategoriesRoute:Router = Router({mergeParams: true});

subCategoriesRoute.route('/')
.get(filterData, getSubcategories)
.post(createSubcategoryValidator, createSubcategory);

subCategoriesRoute.route('/:id')
.get(getSubcategoryValidator, getSubcategories)
.put(updateSubcategoryValidator, updateSubcategory)
.delete(deleteSubcategoryValidator, deleteSubcategory)

export default subCategoriesRoute;
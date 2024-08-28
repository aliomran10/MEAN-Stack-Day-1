import subCategoriesModel from "../models/subCategoryModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import { NextFunction, Request, Response } from "express";
import { SubCategories } from "../Interfaces/subCategories";
import { FilterData } from "../Interfaces/filterData";

export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) { filterData.category = req.params.categoryId };
    req.filterData = filterData;
    next();
}

export const createSubcategory = createOne<SubCategories>(subCategoriesModel)
export const getSubcategories = getAll<SubCategories>(subCategoriesModel, 'subcategories')
export const getSubcategory = getOne<SubCategories>(subCategoriesModel)
export const updateSubcategory = updateOne<SubCategories>(subCategoriesModel)
export const deleteSubcategory = deleteOne<SubCategories>(subCategoriesModel)
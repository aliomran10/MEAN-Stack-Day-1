import { Categories } from "../Interfaces/categories"
import categoryModel from "../models/categoryModel"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";

export const createCategory = createOne<Categories>(categoryModel)
export const getCategories = getAll<Categories>(categoryModel, 'categories')
export const getCategory = getOne<Categories>(categoryModel)
export const updateCategory = updateOne<Categories>(categoryModel)
export const deleteCategory = deleteOne<Categories>(categoryModel)
import { Categories } from "../Interfaces/categories"
import categoryModel from "../models/categoryModel"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import  asyncHandler  from 'express-async-handler';
import sharp from "sharp";
import { uploadSingleImage } from "../middleware/uploadImages";

export const createCategory = createOne<Categories>(categoryModel)
export const getCategories = getAll<Categories>(categoryModel, 'categories')
export const getCategory = getOne<Categories>(categoryModel)
export const updateCategory = updateOne<Categories>(categoryModel)
export const deleteCategory = deleteOne<Categories>(categoryModel)
export const uploadCategoryImage = uploadSingleImage('image');
export const resizeCategoryImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const imageName: string = `category-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/categories/${imageName}`)
        req.body.image = imageName;
    }
    next();
});
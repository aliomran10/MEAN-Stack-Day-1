import { Request, Response, NextFunction } from "express"
import categoryModel from "../models/categoryModel"
import asyncHandler from "express-async-handler";
import { SubCategories } from "../Interfaces/subCategories";
import subCategoryModel from "../models/subCategoryModel";

export const createSubCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    const subCategory:SubCategories = await subCategoryModel.create(req.body);
    res.status(201).json({data: subCategory})
})

export const getSubCategories = asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    const subCategories = await subCategoryModel.find();
    res.status(200).json({data:subCategories});
})

export const getSubCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    const subCategory = await subCategoryModel.findById(req.params.id);
    res.status(200).json({data: subCategory})
})

export const updateSubCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    const subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json({data:subCategory})
})

export const deleteSubCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
    const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
    res.status(204).json();
})
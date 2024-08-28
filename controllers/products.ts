import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import { NextFunction, Request, Response } from "express";
import { Products } from "../Interfaces/products";
import ApiErrors from "../utils/apiError";
import productsModel from "../models/productsModel";
import { FilterData } from "../Interfaces/filterData";
import multer from "multer";

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `Product-${Date.now()}-cover.${ext}`;
        cb(null, fileName)
    }
})

const multerFilter = function (req: Request, file:any, cb: any) {
    if (file.mimetype.startsWith('image')) { cb(null, true) }
    else { cb(new ApiErrors('File is Not an image', 400), false) }
}
export const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
export const createProduct = createOne<Products>(productsModel)
export const getProducts = getAll<Products>(productsModel, 'products')
export const getProduct = getOne<Products>(productsModel)
export const updateProduct = updateOne<Products>(productsModel)
export const deleteProduct = deleteOne<Products>(productsModel)
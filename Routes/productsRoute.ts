import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, upload } from "../controllers/products";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validator/productsValidator";
const productsRoute: Router = Router();

productsRoute.route('/')
    .get(getProducts)
    .post(upload.single('cover'), createProductValidator, createProduct);

productsRoute.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);

export default productsRoute;
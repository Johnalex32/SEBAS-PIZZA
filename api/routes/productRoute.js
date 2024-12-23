import express from "express";
import { getProductsAll, registerProduct, editProduct, getProductById, deleteProduct } 
from "../controllers/productController.js";

const router = express.Router();

router.post('/',registerProduct);
router.get('/productos',getProductsAll);
router.put('/editProductos/:id',editProduct);
router.get('/:id',getProductById);
router.delete('/delete/:id',deleteProduct);

export default router
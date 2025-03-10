import express from "express";
import { getProductsAll, registerProduct, editProduct, getProductById, deleteProduct } 
from "../controllers/productController.js";

const router = express.Router();

router.post('/registerProductos',registerProduct);
router.get('/',getProductsAll);
router.put('/editProductos/:id',editProduct);
router.get('/:id',getProductById);
router.delete('/delete/:id',deleteProduct);

export default router
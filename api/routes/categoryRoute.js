import express from "express";
import { registerCategory,getCategories,editCategory,getCategoryById, deleteCategory } 
from "../controllers/categoryController.js";

const router = express.Router();

router.post('/registerCategory',registerCategory);
router.get('/categories',getCategories );
router.put('/editCategories/:id', editCategory);
router.get('/:id',getCategoryById);
router.delete('/delete/:id',deleteCategory);

export default router
import express from "express";
import { registerCategory } 
from "../controllers/categoryController";

const router = express.Router();

router.post('/categorias',registerCategory);

export default router
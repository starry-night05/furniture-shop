import express from "express";
import {
    categoryList,
    getCategoryById,
    addCategory,
    updateCategory,
    removeCategory,
} from "../controllers/CategoriesController.js";

const router = express.Router();

router.get('/categories', categoryList);

router.get('/category/:id', getCategoryById);
router.post('/category', addCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', removeCategory);

export default router;

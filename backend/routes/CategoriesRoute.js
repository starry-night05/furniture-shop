import express from "express";
import {
    categoryList,
    getCategoryById,
    addCategory,
    updateCategory,
    removeCategory,
} from "../controllers/CategoriesController.js";
import { verifyUser, adminOnly } from '../middleware/Auth.js';

const router = express.Router();

router.get('/categories', verifyUser, categoryList);
router.get('/category/:id', verifyUser, getCategoryById);
router.post('/addCategory', adminOnly, addCategory);
router.patch('/updateCategory/:id', adminOnly, updateCategory);
router.delete('/removeCategory/:id', adminOnly, removeCategory);

export default router;
import express from 'express';
import {
    categoryList,
    getCategoryById,
    addCategory,
    updateCategory,
    removeCategory,
} from '../controllers/CategoriesController.js';

const router = express.Router();

router.get('/categories', categoryList);
router.get('/category/:id', getCategoryById);
router.post('/addCategory', addCategory);
router.patch('/updateCategory/:id', updateCategory);
router.delete('/removeCategory/:id', removeCategory);

export default router;
import express from 'express';
import {
    getProducts,
    getProductById,
    getProductBycategory,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js';
import { verifyUser, adminOnly } from '../middleware/Auth.js';

const router = express.Router();

router.get('/products', getProducts);

router.get('/product/:id', getProductById);
router.post('/product', verifyUser, adminOnly, createProduct);
router.patch('/product/:id', adminOnly, updateProduct);
router.delete('/product/:id', adminOnly, deleteProduct);

router.get('/products-category/:id', verifyUser, getProductBycategory);

export default router;

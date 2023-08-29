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

router.get('/products', verifyUser, getProducts);
router.get('/product/:id', verifyUser, getProductById);
router.get('/products-category/:id', verifyUser, getProductBycategory);
router.post('/addProduct', adminOnly, createProduct);
router.patch('/updateProduct/:id', adminOnly, updateProduct);
router.delete('/removeProduct/:id', adminOnly, deleteProduct);

export default router;
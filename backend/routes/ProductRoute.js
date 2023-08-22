import express from 'express';
import {
    getProducts,
    getProductById,
    getProductBycategory,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/products-category/:id', getProductBycategory);
router.post('/addProduct', createProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/removeProduct/:id', deleteProduct);

export default router;
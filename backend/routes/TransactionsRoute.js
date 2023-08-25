import express from 'express';
import {
    confirmOrder
} from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/confirm', confirmOrder);
// router.get('/product/:id', getProductById);
// router.get('/products-category/:id', getProductBycategory);
// router.post('/addProduct', createProduct);
// router.patch('/updateProduct/:id', updateProduct);
// router.delete('/removeProduct/:id', deleteProduct);

export default router;
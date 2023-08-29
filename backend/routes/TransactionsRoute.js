import express from 'express';
import {
    confirmOrder,
    checkoutList
} from '../controllers/TransactionController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.post('/confirm', verifyUser, confirmOrder);
router.get('/checkoutList', verifyUser, checkoutList);
// router.get('/product/:id', getProductById);
// router.get('/products-category/:id', getProductBycategory);
// router.post('/addProduct', createProduct);
// router.patch('/updateProduct/:id', updateProduct);
// router.delete('/removeProduct/:id', deleteProduct);

export default router;